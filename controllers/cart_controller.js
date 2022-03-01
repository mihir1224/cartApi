const mongoose = require("mongoose");
const cart = require("../model/cart_model");

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
    res.send({
      error: false,
      statusCode: 200,
      message: "Cart created successfully",
      data: saveCart,
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
    const singleCart = await cart.findById(req.params.productId);
    res.json({
      error: false,
      statusCode: 200,
      message: "Cart show successfully",
      data: singleCart,
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
    res.json({
      error: false,
      statusCode: 200,
      message: "Updated successfully",
      data: cartUpdate,
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
    const cartDelete = await cart.findByIdAndDelete(req.params.productId);
    res.json({
      error: false,
      statusCode: 200,
      message: "Deleted successfully",
      data: cartDelete,
    });
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message,
    });
  }
};
