const axios = require("axios");

export const newUser = (nickname) => {
  console.log(nickname);
  return new Promise((res, rej) => {
    axios
      .post("http://localhost:3008/api/users/", { nickname })
      .then(function (response) {
        res(response);
      })
      .catch(function (error) {
        rej(error);
      });
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
