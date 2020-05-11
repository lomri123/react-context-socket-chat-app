const express = require("express");
const mongooseDB = require("./databases/dbConnection");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("running on port ", +port);
});
