const express = require("express");
const mongooseDB = require("./databases/dbConnection");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const roomController = require("./controllers/roomController");
const messageController = require("./controllers/messageController");

app.use("/api/rooms", roomController);
app.use("/api/messages", messageController);

io.on("connection", (client) => {
  client.emit("message", "you are logged into the chat");
  client.broadcast.emit("message", "a user joined the chat");
  client.on("disconnect", () => {
    /* … */
  });
});

const port = process.env.PORT || 3008;

server.listen(port, () => {
  console.log("running on port ", port);
});
