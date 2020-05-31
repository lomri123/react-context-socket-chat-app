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

export const addRoom = (roomData, image) => {
  const formData = new FormData();
  formData.append("roomData", JSON.stringify(roomData));
  if (image !== undefined) {
    formData.append("img", image);
  }

  return new Promise((res, rej) => {
    axios({
      method: "post",
      url: "http://localhost:3008/api/rooms/",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => res(response))
      .catch((error) => rej(error));
  });
};
