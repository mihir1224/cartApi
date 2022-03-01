const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

module.exports = mongoose.model("product", productSchema);
