const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  id: String,
  name: String,
  user: String,
  phone: String,
  password: String,
});
module.exports = mongoose.model("ShopUser", PostSchema);
