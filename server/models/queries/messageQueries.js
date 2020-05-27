const Room = require("../roomModel");
const mongoose = require("mongoose");
const fetchAllMessages = (id) => {
  return Room.findById(id);
};

const fetchMessagesRange = (id, start = -20, quantity = 20) => {
  return Room.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    {
      $project: {
        messages: {
          $cond: {
            if: { $gte: [-1 * (start + quantity), { $size: "$messages" }] },
            then: [],
            else: {
              $slice: [
                "$messages",
                start,
                {
                  $cond: {
                    if: {
                      $gte: [{ $size: "$messages" }, -1 * (start + quantity)],
                    },
                    then: quantity,
                    else: {
                      $subtract: [
                        { $size: "$messages" },
                        -1 * (start + quantity),
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  ])
    .then((data) => data[0])
    .catch((error) => new Error(error));
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
