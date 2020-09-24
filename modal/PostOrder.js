const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  userId: String,
  shopId: String,
  productId: String,
  quantity: Number,
  status: Boolean,
});
module.exports = mongoose.model("orders", PostSchema);
