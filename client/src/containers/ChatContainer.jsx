import React, { useEffect, useState, useContext } from "react";
import { Context } from "../contexts/DataStore";
import RoomContainer from "./RoomContainer";
import MessagesContainer from "../containers/MessageContainer";
import socket from "./../services/socket";
import LoginPopup from "./../components/LoginPopup";
import { addUser, changeActiveRoom } from "../contexts/actions/actions";

function ChatContainer() {
  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      userLogin(JSON.parse(user), false);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatchUserData, dispatchActiveRoom } = useContext(Context);

  const userLogin = (user, isNew) => {
    console.log("inside userLogin", user, isNew);

    socket.emit("joinRoom", { user }, (error) => {
      console.log("inside joinRoom");
      if (error) {
        console.log("inside error");
        alert(error);
      }
    });
    setIsLoggedIn(true);
    const dispatchUser = addUser(user);
    dispatchUserData(dispatchUser);
    if (isNew) {
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      const dispatchUser = changeActiveRoom(user.room);
      dispatchActiveRoom(dispatchUser);
    }
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
