const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  quantity: Number,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

module.exports = mongoose.model("cart", cartSchema);
