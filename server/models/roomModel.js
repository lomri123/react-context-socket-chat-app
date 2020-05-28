const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String },
    messages: [
      {
        text: String,
        from: String,
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

const Room = mongoose.model("rooms", roomSchema);

module.exports = Room;
