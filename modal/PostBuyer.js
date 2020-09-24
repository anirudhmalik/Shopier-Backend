const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  id: String,
  name: String,
  longitude: Number,
  latitude: Number,
  user: String,
  phone: String,
  password: String,
});
module.exports = mongoose.model("Customers", PostSchema);
