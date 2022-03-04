const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  count: Number,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email is required"],
  },
});

module.exports = mongoose.model("product", productSchema);
