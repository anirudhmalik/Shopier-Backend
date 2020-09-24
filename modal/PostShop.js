const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  userId: String,
  shopname: String,
  longitude: Number,
  latitude: Number,
  pic_url: String,
});
module.exports = mongoose.model("shops", PostSchema);
