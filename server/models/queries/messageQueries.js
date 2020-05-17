const Room = require("../roomModel");

const fetchAllMessages = (id) => {
  return Room.findById(id);
};

const fetchMessagesRange = (id, start = 0, quantity = 10) => {
  return Room.findById(id, { messages: { $slice: [start, quantity] } });
};

const deleteMessage = (roomId, messageId) => {
  return Room.updateOne(
    { _id: roomId },
    { $pull: { messages: { _id: messageId } } }
  );
};

const updateMessage = (roomid, messageId, message) => {
  return Room.updateOne(
    { _id: roomid, "messages.id": messageId },
    { $set: message }
  );
};

const addMessage = (MessageData, id) => {
  const { text, from, to, createdAt } = MessageData;
  const message = {
    text,
    from,
    to,
    createdAt,
  };
  return Room.findByIdAndUpdate(id, {
    $push: { messages: message },
  });
};

module.exports = {
  fetchAllMessages,
  fetchMessagesRange,
  deleteMessage,
  updateMessage,
  addMessage,
};
