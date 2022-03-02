const mongoose = require("mongoose");
const cart = require("../model/cart_model");
const product = require("../model/product_model");

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
      select: "name",
    });

    const counts = await product.findByIdAndUpdate(
      saveCart.productId._id,
      { $inc: { count: -saveCart.quantity } },
      { new: true }
    );

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
    const carts = req.body;

    const cartUpdate = await cart.findByIdAndUpdate(req.params.cartId, carts, {
      new: true,
    });

    const count = await product.findByIdAndUpdate(
      cartUpdate.productId._id,
      { $inc: { count: -cartUpdate.quantity } },
      { new: true }
    );

    res.json({
      error: false,
      statusCode: 200,
      message: "Updated successfully",
      data: cartUpdate,
      product: count,
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
