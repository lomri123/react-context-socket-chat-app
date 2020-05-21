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
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./databases/localDB");

app.use("/api/rooms", roomController);
app.use("/api/messages", messageController);
app.use("/api/users", userController);

io.on("connection", (client) => {
  client.on("joinRoom", async (data) => {
    const { username, room } = data;
    userJoin(socket.id, username, room);
    socket.join(room);
    socket.emit("message", formatMessage("Admin", "Welcome to chat!"));
    socket.broadcast
      .to(room)
      .emit(
        "message",
        formatMessage("Admin", `${username} has joined the chat`)
      );
    client.on("chatMessage", async (data) => {
      const { message } = data;
      const { room } = getCurrentUser(socket.id);
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
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage("Admin", `${user.username} has left the chat`)
        );
      }
    });
  });
});

const port = process.env.PORT || 3008;

server.listen(port, () => {
  console.log("running on port ", port);
});
