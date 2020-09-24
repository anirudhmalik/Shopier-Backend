const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  id: String,
  label: String,
  uri: String,
  value: String,
});
module.exports = mongoose.model("DefaultSubCategories", PostSchema);
