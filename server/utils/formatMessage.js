const moment = require("moment");

function formatMessage(from, text) {
  return {
    message: { from, text, createdAt: moment().format("h:mm a") },
  };
}

module.exports = formatMessage;
