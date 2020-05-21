import React, { useEffect, useState, useContext } from "react";
import RoomContainer from "./RoomContainer";
import MessagesContainer from "../containers/MessageContainer";
import socket from "./../services/socket";
import LoginPopup from "./../components/LoginPopup";

function ChatContainer() {
  useEffect(() => {
    console.log("chatContainer");
    const user = localStorage.getItem("userData");
    if (user) {
      userLogin(user);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userLogin = (user) => {
    const { name, room } = user;
    socket.emit("joined", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    setIsLoggedIn(true);
  };

  return (
    <>
      <h1>Chat app</h1>
      <div className="messaging">
        <div className="inbox_msg">
          {isLoggedIn ? null : <LoginPopup userLogin={userLogin} />}
          <RoomContainer />
          <MessagesContainer />
        </div>
      </div>
    </>
  );
}

export default ChatContainer;
