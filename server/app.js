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
const userController = require("./controllers/userController");
const { addMessage } = require("./models/queries/messageQueries");

app.use("/api/rooms", roomController);
app.use("/api/messages", messageController);
app.use("/api/users", userController);

io.on("connection", (client) => {
  // client.emit("message", {from: "Admin", text: "you are logged into the chat"});
  // client.broadcast.emit("message", "a user joined the chat");
  client.on("newMessage", async (data) => {
    const { room, message } = data;
    console.log(room, message);
    try {
      const result = await addMessage(message, room);
      io.to(room).emit("message", { message: result, tmpId: message._id });
    } catch (error) {
      client.emit("message", {
        from: "Admin",
        text: "problem sending message" + data,
      });
    }
  });
  client.on("disconnect", () => {
    /* … */
  });
});

const port = process.env.PORT || 3008;

server.listen(port, () => {
  console.log("running on port ", port);
});
