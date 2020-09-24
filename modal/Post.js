const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  userId: String,
  id: String,
  itemId: String,
});
module.exports = mongoose.model("ShopCategories", PostSchema);
