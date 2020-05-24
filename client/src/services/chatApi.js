const axios = require("axios");

export const getRooms = () => {
  return new Promise((res, rej) => {
    axios
      .get("http://localhost:3008/api/rooms/")
      .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      });
  });
};

export const getMessages = (
  room = "5ec3224716239d08946e5696",
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
  console.log(options);
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
