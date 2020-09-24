const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  userId: String,
  id: String,
  value: String,
});
module.exports = mongoose.model("ShopDetails", PostSchema);
