const express = require("express");
const mongoose = require("mongoose");

const defaultcategories = require("./routes/defaultcategories");
const defaultsubcategories = require("./routes/defaultsubcategories");
const defaultproducts = require("./routes/defaultproducts");
const shopdetails = require("./routes/shopdetails");
const shopcategories = require("./routes/shopcategories");
const shopsubcategories = require("./routes/shopsubcategories");
const shopproducts = require("./routes/shopproducts");
const auth = require("./routes/auth");
const shops = require("./routes/shops.js");
const buyershop = require("./routes/buyershop.js");
const users = require("./routes/users");
const location = require("./routes/location");
const orders = require("./routes/orders");
const orderlist = require("./routes/orderlist");
const sellerorders = require("./routes/sellerorders");
const helmet = require("helmet");
const compression = require("compression");
const config = require("config");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

//database connect
mongoose.connect(
  "mongodb://localhost:27017/shopier",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

app.use("/api/users", users);
app.use("/api/gps", location);
app.use("/api/auth", auth);
app.use("/api/shops", shops);
app.use("/api/buyershops", buyershop);
app.use("/api/categorylist", defaultcategories);
app.use("/api/subcategorylist", defaultsubcategories);
app.use("/api/productlist", defaultproducts);
app.use("/api/details", shopdetails);
app.use("/api/categories", shopcategories);
app.use("/api/subcategories", shopsubcategories);
app.use("/api/products", shopproducts);
app.use("/api/order", orders);
app.use("/api/orderlist", orderlist);
app.use("/api/sellerorders", sellerorders);
const port = process.env.PORT || config.get("port");
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});
