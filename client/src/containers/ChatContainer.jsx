import React, { useEffect } from "react";
import RoomContainer from "./RoomContainer";
import MessagesContainer from "../containers/MessageContainer";
import socket from "./../services/socket";

function ChatContainer() {
  useEffect(() => {
    console.log("chatContainer");
    // const { name, room } = localStorage.getItem("userData");
    const name = "omri";
    const room = "test";
    socket.emit("joined", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  return (
    <>
      <h1>Chat app</h1>
      <div className="messaging">
        <div className="inbox_msg">
          <RoomContainer />
          <MessagesContainer />
        </div>
      </div>
    </>
  );
}

export default ChatContainer;
