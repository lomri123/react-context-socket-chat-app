import React, { useContext, useEffect, useCallback } from "react";
import { Context } from "../contexts/DataStore";
import SingleMessage from "./../components/messagesBox/SingleMessage";
import NewMessageBox from "./../components/messagesBox/NewMessageBox";
import socket from "./../services/socket";
import { getMessages } from "../services/chatData";

function MessagesContainer() {
  useEffect(() => {
    console.log("messageContainer");
    // const { room } = localStorage.getItem("userData");
    getMessages()
      .then((response) => addNewMessages(response.data))
      .catch((error) => console.log(error));
    socket.on("message", (data) => {
      console.log(data);
    });
  }, []);

  const { messageData, dispatchMessageData } = useContext(Context);

  const addNewMessage = (message) => {
    dispatchMessageData({ type: "ADD_MESSAGE", message });
  };
  const addNewMessages = (messages) => {
    dispatchMessageData({ type: "ADD_MESSAGES", messages: [...messages] });
  };

  return (
    <>
      <div className="mesgs">
        <SingleMessage messageListProps={messageData} />
        <NewMessageBox addNewMessage={addNewMessage} />
      </div>
    </>
  );
}

export default MessagesContainer;
