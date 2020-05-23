const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
