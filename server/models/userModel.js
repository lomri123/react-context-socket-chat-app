const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickName: { type: String, unique: true },
  password: String
});

const User = mongoose.model("users", userSchema);

module.exports = User;
