const mongoose = require("mongoose");

const express = require("express");

const app = express();

//config
require("dotenv").config();

//middleWare
app.use(express.json());

//product_routes
const productRoutes = require("./routes/product_routes");

//customer_routes
const cartRoutes = require("./routes/cart_routes");

//api link for customer
app.use("/api/product", productRoutes);

//api link for customer
app.use("/api/cart", cartRoutes);

//connect to database
mongoose.connect(
  process.env.db_connect,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("connect successfully")
);

//server
app.get("", (req, res) => {
  res.send("Welcome to my world!🙏🙌");
});
app.listen(2000, () => {
  console.log("connect...");
});
