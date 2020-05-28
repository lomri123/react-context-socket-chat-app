const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

function formatMessage(from, text) {
  return {
    message: {
      from,
      text,
      createdAt: moment().format("h:mm a"),
      _id: uuidv4(),
    },
  };
}

module.exports = formatMessage;
