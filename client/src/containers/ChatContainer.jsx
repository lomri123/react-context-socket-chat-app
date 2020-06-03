import React, { useEffect, useState, useContext, useCallback } from "react";
import { Context } from "../contexts/DataStore";
import RoomContainer from "./RoomContainer";
import MessagesContainer from "../containers/MessageContainer";
import socket from "../services/socket";
import LoginPopup from "../components/user/LoginPopup";
import { setUser, changeActiveRoom } from "../contexts/actions/actions";

function ChatContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatchUserData, dispatchActiveRoom } = useContext(Context);

  const userLogin = useCallback((user, isNew) => {
    socket.emit("join", { user }, (error) => {
      if (error) {
        console.log("userLogin error", error);
        alert(error);
      }
    });
    setIsLoggedIn(true);
    const dispatchUser = setUser(user);
    dispatchUserData(dispatchUser);
    if (isNew) {
      localStorage.setItem("userData", JSON.stringify(user));
    }
    const changedRoom = changeActiveRoom(user.room);
    dispatchActiveRoom(changedRoom);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      userLogin(JSON.parse(user), false);
    }
  }, []);

  return (
    <>
      <h1 class="logo my-4">Chat app</h1>
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
