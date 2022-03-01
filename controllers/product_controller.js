const mongoose = require("mongoose");
const product = require("../model/product_model");

//create
exports.createProduct = async (req, res) => {
  try {
    const productDetails = new product({
      name: req.body.name,
      count: req.body.count,
    });

    const saveProduct = await productDetails.save();
    res.send({
      error: false,
      statusCode: 200,
      message: "Product created successfully",
      data: saveProduct,
    });
  } catch (error) {
    res.send({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//all product
exports.showAllProduct = async (req, res) => {
  try {
    const products = await product.find();
    res.json({
      error: false,
      statusCode: 200,
      message: "Product show successfully",
      data: products,
    });
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//single product
exports.showSingleProduct = async (req, res) => {
  try {
    const singleProduct = await product.findById(req.params.productId);
    res.json({
      error: false,
      statusCode: 200,
      message: "Product show successfully",
      data: singleProduct,
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
exports.updateProduct = async (req, res) => {
  try {
    const products = req.body;

    const productUpdate = await product.findByIdAndUpdate(
      req.params.productId,
      products,
      { new: true }
    );
    res.json({
      error: false,
      statusCode: 200,
      message: "Updated successfully",
      data: productUpdate,
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
exports.deleteProduct = async (req, res) => {
  try {
    const productDelete = await product.findByIdAndDelete(req.params.productId);
    res.json({
      error: false,
      statusCode: 200,
      message: "Deleted successfully",
      data: productDelete,
    });
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message,
    });
  }
};
