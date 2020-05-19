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
  start = -10,
  quantity = 10
) => {
  const options = {
    method: "get",
    url: `http://localhost:3008/api/messages/${room}`,
    headers: { "Content-Type": "application/json" },
    data: {
      start,
      quantity,
    },
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
