import React, { useContext, useEffect, useCallback } from "react";
import { Context } from "../contexts/DataStore";
import { v4 as uuidv4 } from "uuid";
import MessageList from "../components/messagesBox/MessageList";
import NewMessageBox from "./../components/messagesBox/NewMessageBox";
import socket from "./../services/socket";
import { getMessages } from "../services/chatApi";
import { addMessage, addMessages } from "./../contexts/actions/actions";

function MessagesContainer() {
  const user = "test_add";
  useEffect(() => {
    console.log("messageContainer");
    getMessages(activeRoom)
      .then((response) => addNewMessages(response.data))
      .catch((error) => console.log(error));
    socket.on("message", (data) => {
      if (data.message.from === user) {
        updateMessageInd(data);
      } else {
        addNewMessage(data.message);
      }
    });
  }, []);

  const { messageData, dispatchMessageData, activeRoom } = useContext(Context);

  const sendNewMessage = (message) => {
    const uniqueId = uuidv4();
    addNewMessage({ ...message, sentInd: true, _id: uniqueId });
    socket.emit("chatMessage", { message, tmpId: uniqueId });
  };

  const addNewMessage = (message) => {
    const dispatchMessage = addMessage(message);
    dispatchMessageData(dispatchMessage);
  };

  const addNewMessages = (messages) => {
    console.log(messages);
    const dispatchMessages = addMessages(messages);
    dispatchMessageData(dispatchMessages);
  };
  const updateMessageInd = (data) => {
    const dispatchMessage = addMessage(data);
    dispatchMessageData(dispatchMessage);
  };

  return (
    <>
      <div className="mesgs">
        <MessageList
          messageListProps={messageData}
          addNewMessages={addNewMessages}
          activeRoom={activeRoom}
        />
        <NewMessageBox sendNewMessage={sendNewMessage} />
      </div>
    </>
  );
}

export default MessagesContainer;
