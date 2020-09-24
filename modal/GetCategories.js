const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  id: String,
  icon: String,
  label: String,
  uri: String,
  value: String,
});
module.exports = mongoose.model("DefaultCategories", PostSchema);
