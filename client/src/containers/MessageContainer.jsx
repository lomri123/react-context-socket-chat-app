import React, { useContext, useEffect, useCallback, useState } from "react";
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

  const [userLastMessage, setUserLastMessage] = useState(null);
  const sendNewMessage = (message) => {
    const uniqueId = uuidv4();
    const myMessage = { ...message, from: userData.username, room: activeRoom };
    addNewMessage({ ...myMessage, sentInd: true, _id: uniqueId });
    socket.emit("chatMessage", { message: myMessage, tmpId: uniqueId });
    setUserLastMessage(myMessage);
  };

  const addNewMessage = (message) => {
    const dispatchMessage = addMessage(message);
    dispatchMessageData(dispatchMessage);
  };

  const addNewMessages = (messages, isInitial) => {
    if (messages.length > 0 || isInitial) {
      let dispatchMessages = {};
      if (isInitial) {
        const tmpMessages = messages;
        if (messageData.length > 0) {
          const userLastMessage = messageData.pop();
          if (userLastMessage.text === "Welcome to chat!") {
            tmpMessages.push(userLastMessage);
          }
        }
        dispatchMessages = setInitialMessages(tmpMessages);
      } else {
        dispatchMessages = addMessages(messages);
      }
      dispatchMessageData(dispatchMessages);
    }
  };

  const updateNewMessageInd = (data) => {
    const dispatchMessage = updateMessageInd(data);
    dispatchMessageData(dispatchMessage);
  };

  const handleIncomingMessage = useCallback((data, user) => {
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
          messageList={messageData}
          addNewMessages={addNewMessages}
          activeRoom={activeRoom}
          userData={userData}
          userLastMessage={userLastMessage}
          setUserLastMessage={setUserLastMessage}
        />
        <NewMessageBox sendNewMessage={sendNewMessage} userData={userData} />
      </div>
    </>
  );
}

export default MessagesContainer;
