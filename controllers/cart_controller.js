const mongoose = require("mongoose");
const cart = require("../model/cart_model");
const product = require("../model/product_model");
const nodemailer = require("nodemailer");

//create
exports.createCart = async (req, res) => {
  try {
    const cartDetails = new cart({
      quantity: req.body.quantity,
      productId: req.body.productId,
    });

    let saveCart = await cartDetails.save();
    await saveCart.populate({
      path: "productId",
      select: "name email",
    });

    const counts = await product.findByIdAndUpdate(
      saveCart.productId._id,
      { $inc: { count: -saveCart.quantity } },
      { new: true }
    );

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "mihirborsaliwala75@gmail.com",
        pass: "mihir4221",
      },
    });

    let mailOptions = {
      from: "mihirborsaliwala75@gmail.com",
      to: counts.email,
      subject: "Cart created successfully",
      text: JSON.stringify(req.body),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    module.exports = nodemailer;

    res.send({
      error: false,
      statusCode: 200,
      message: "Cart created successfully",
      data: saveCart,
      product: counts,
    });
  } catch (error) {
    res.send({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//all cart
exports.ShowCart = async (req, res) => {
  try {
    const carts = await cart.find().populate({
      path: "productId",
      select: "name",
    });
    res.json({
      error: false,
      statusCode: 200,
      message: "Cart show successfully",
      data: carts,
    });
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//show by Id
exports.showSingleCart = async (req, res) => {
  try {
    const singleCart = await cart.findById(req.params.cartId);

    res.json({
      error: false,
      statusCode: 200,
      message: "Cart show successfully",
      data: singleCart,
      product: count,
    });
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//update
exports.updateCart = async (req, res) => {
  try {
    const newCarts = req.body;
    const oldCart = await cart.findById(req.params.cartId);

    // const oldCart = await cart.findByIdAndUpdate(req.params.cartId, newCart);
    const newCart = await cart.findByIdAndUpdate(req.params.cartId, newCarts, {
      new: true,
    });

    const updateQuantity = newCart.quantity - oldCart.quantity;

    const countUpdate = await product.findByIdAndUpdate(
      oldCart.productId,
      { $inc: { count: -updateQuantity } },
      { new: true }
    );

    // oldCart.quantity = newCart.quantity;

    res.json({
      error: false,
      statusCode: 200,
      message: "Updated successfully",
      data: oldCart,
      product: countUpdate,
    });
  } catch (error) {
    res.json({
      error: false,
      statusCode: 404,
      message: error.message,
    });
  }
};

//delete
exports.deleteCart = async (req, res) => {
  try {
    const cartDelete = await cart.findByIdAndDelete(req.params.cartId);

    const counts = await product.findByIdAndUpdate(
      cartDelete.productId._id,
      { $inc: { count: cartDelete.quantity } },
      { new: true }
    );

    res.json({
      error: false,
      statusCode: 200,
      message: "Deleted successfully",
      data: cartDelete,
      product: counts,
    });
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

// module.exports = nodemailer;
