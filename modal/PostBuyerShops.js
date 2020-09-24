const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  userId: String,
  shopId: String,
});
module.exports = mongoose.model("CustomersShop", PostSchema);
