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
const { authenticateUser } = require("./models/queries/userQueries");
const formatMessage = require("./utils/formatMessage");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  userChangeRoom,
} = require("./databases/localDB");

app.use("/api/rooms", roomController);
app.use("/api/messages", messageController);
app.use("/api/users", userController);

io.on("connection", (socket) => {
  socket.on("join", async (data) => {
    const { _id, username, room } = data.user;
    if (authenticateUser(_id, username)) {
      console.log("user joined", data);
      userJoin(socket.id, username, room);
      socket.join(room);
      socket.emit("message", formatMessage("Admin", "Welcome to chat!"));
      socket.broadcast
        .to(room)
        .emit(
          "message",
          formatMessage("Admin", `${username} has joined the chat`)
        );
    } else {
      socket.emit(
        "message",
        formatMessage("Admin", "Authentication failed, please contact support")
      );
      socket.disconnect();
    }
    socket.on("chatMessage", async (data) => {
      const { message, tmpId } = data;
      const { room, username } = getCurrentUser(socket.id);
      try {
        const result = await addMessage({ ...message, from: username }, room);
        const newMessage = result.messages[0];
        io.to(room).emit("message", {
          message: newMessage,
          tmpId,
        });
      } catch (error) {
        console.log("addMessage error", error);
        socket.emit("message", {
          from: "Admin",
          text: "problem sending message" + data,
        });
      }
    });
    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage("Admin", `${user.username} has left the chat`)
        );
      }
    });
    socket.on("change room", function (data) {
      const { newroom } = data;
      userChangeRoom(socket.id, newroom);
      socket.leave(socket.room);
      socket.join(newroom);
    });
  });
});

const port = process.env.PORT || 3008;

server.listen(port, () => {
  console.log("running on port ", port);
});
