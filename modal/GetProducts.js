const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  id: String,
  label: String,
  uri: String,
  cost: Number,
  quantity: String,
  value: String,
});
module.exports = mongoose.model("DefaultProducts", PostSchema);
