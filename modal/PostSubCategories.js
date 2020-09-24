const mongoose = require("mongoose");
const { stripComments } = require("config/parser");
const PostSchema = mongoose.Schema({
  userId: String,
  id: String,
  itemId: String,
});
module.exports = mongoose.model("ShopSubCategories", PostSchema);
