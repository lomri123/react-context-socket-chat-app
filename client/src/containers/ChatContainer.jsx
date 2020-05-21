import React, { useEffect, useState, useContext } from "react";
import { Context } from "../contexts/DataStore";
import RoomContainer from "./RoomContainer";
import MessagesContainer from "../containers/MessageContainer";
import socket from "./../services/socket";
import LoginPopup from "./../components/LoginPopup";
import {
  ADD_USER,
  CHANGE_ACTIVE_ROOM,
} from "./../contexts/actions/actionTypes";

function ChatContainer() {
  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      userLogin(user, false);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatchUserData, dispatchActiveRoom } = useContext(Context);

  const userLogin = (user, isNew) => {
    socket.emit("joinRoom", { user }, (error) => {
      if (error) {
        alert(error);
      } else {
        setIsLoggedIn(true);
        dispatchUserData({ type: ADD_USER, user });
        if (isNew) {
          localStorage.setItem("userData", user);
        } else {
          dispatchActiveRoom({ type: CHANGE_ACTIVE_ROOM, ...user.room });
        }
      }
    });
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
