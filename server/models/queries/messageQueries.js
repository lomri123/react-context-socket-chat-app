
const Room = require("../roomModel");

const fetchAllMessages = () => {
  return Room.find().sort({ _id: -1 });
};

const fetchMessage = id => {
  return Room.findById(id);
};

const deleteMessage = id => {
  return Room.findByIdAndDelete(id);
};

const updateMessage = (id, updateData) => {
  return Room.findByIdAndUpdate(id, {
    $set: updateData
  });
};

const addMessage = MessageData => {
  const room = {
    subject: RoomData.subject,
    updatedAt: RoomData.updatedAt,
    messages: []
  };
  const tmpRoomSchema = new Room(room);
  const result = tmpRoomSchema.save();
  return result;
};

module.exports = {
  fetchAllMessages, 
  deleteMessage,
  updateMessage,
  fetchMessage,
  addMessage
};