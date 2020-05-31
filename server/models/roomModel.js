const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

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

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
