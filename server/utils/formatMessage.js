const { v4: uuidv4 } = require("uuid");

function formatMessage(from, text) {
  return {
    message: {
      from,
      text,
      createdAt: new Date(),
      _id: uuidv4(),
    },
  };
}

module.exports = formatMessage;
