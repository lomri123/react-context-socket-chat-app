import React, { useContext, useEffect, useCallback } from "react";
import { Context } from "../contexts/DataStore";
import { v4 as uuidv4 } from "uuid";
import MessageList from "../components/messagesBox/MessageList";
import NewMessageBox from "./../components/messagesBox/NewMessageBox";
import socket from "./../services/socket";
import {
  addMessage,
  addMessages,
  updateMessageInd,
  setInitialMessages,
} from "./../contexts/actions/actions";

function MessagesContainer() {
  const { messageData, dispatchMessageData, activeRoom, userData } = useContext(
    Context
  );

  const sendNewMessage = (message) => {
    const uniqueId = uuidv4();
    const myMessage = { ...message, from: userData.username, room: activeRoom };
    addNewMessage({ ...myMessage, sentInd: true, _id: uniqueId });
    socket.emit("chatMessage", { message: myMessage, tmpId: uniqueId });
  };

  const addNewMessage = useCallback((message) => {
    const dispatchMessage = addMessage(message);
    dispatchMessageData(dispatchMessage);
  }, []);

  const addNewMessages = (messages, isInitial) => {
    if (messages.length > 0 || isInitial) {
      let dispatchMessages = {};
      if (isInitial) {
        dispatchMessages = setInitialMessages(messages);
      } else {
        dispatchMessages = addMessages(messages);
      }
      dispatchMessageData(dispatchMessages);
    }
  };

  const updateNewMessageInd = useCallback((data) => {
    const dispatchMessage = updateMessageInd(data);
    dispatchMessageData(dispatchMessage);
  }, []);

  const handleIncomingMessage = useCallback((data, user) => {
    console.log("got incoming message", data, user);
    if (data.message.from === user?.username) {
      updateNewMessageInd(data);
    } else {
      addNewMessage(data.message);
    }
  }, []);

  useEffect(() => {
    socket.on("message", (data) => handleIncomingMessage(data, userData));
    return () => {
      socket.off("message", console.log("socket off"));
    };
  }, [userData]);

  return (
    <>
      <div className="mesgs">
        <MessageList
          messageListProps={messageData}
          addNewMessages={addNewMessages}
          activeRoom={activeRoom}
          userData={userData}
        />
        <NewMessageBox sendNewMessage={sendNewMessage} />
      </div>
    </>
  );
}

export default MessagesContainer;
