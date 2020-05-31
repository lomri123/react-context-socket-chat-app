const axios = require("axios");

export const getMessages = (
  room = "5ecee47b336c0d2adcb25a97",
  start = -20,
  quantity = 20
) => {
  const data = {
    room,
    start,
    quantity,
  };
  const options = {
    url: "http://localhost:3008/api/messages/range",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  return new Promise((res, rej) => {
    axios(options)
      .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      });
  });
};
