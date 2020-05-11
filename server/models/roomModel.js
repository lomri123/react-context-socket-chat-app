const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  subject: { type: String, unique: true },
  updatedAt: { type: Date },
  messages: [{
    text : String,
    from: String,
    to: String,
    read: Boolean,
    created_at: Date
     }]
});

const Room = mongoose.model("rooms", roomSchema);

module.exports = Room;
