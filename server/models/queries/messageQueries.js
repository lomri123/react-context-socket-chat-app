const Room = require("../roomModel");

const fetchAllMessages = (id) => {
  return Room.findById(id);
};

const fetchMessagesRange = (id, start = -20, quantity = 20) => {
  return Room.findById(id, { messages: { $slice: [start, quantity] } });
};

const addMessage = (MessageData, room) => {
  const { text, from, createdAt } = MessageData;
  const message = {
    text,
    from,
    createdAt,
  };
  return Room.findOneAndUpdate(
    room,
    {
      $push: { messages: message },
    },
    {
      returnOriginal: false,
      projection: {
        messages: { $slice: -1 },
      },
    }
  );
};

module.exports = {
  fetchAllMessages,
  fetchMessagesRange,
  addMessage,
};
