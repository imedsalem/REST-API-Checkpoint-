const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  age: Number
});

module.exports = User = mongoose.model("User", userSchema);