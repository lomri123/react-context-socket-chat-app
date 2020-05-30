const axios = require("axios");

export const registerUser = (username, image) => {
  const formData = new FormData();
  formData.append("username", `${username}`);
  if (image !== undefined) {
    formData.append("img", image);
  }

  return new Promise((res, rej) => {
    axios({
      method: "post",
      url: "http://localhost:3008/api/users/",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => res(response))
      .catch((error) => rej(error));
  });
};

export const getUser = (user) => {
  return new Promise((res, rej) => {
    axios
      .get(`localhost:3008/api/users/${user}`)
      .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      });
  });
};
