import React, { useContext, useEffect, useCallback } from "react";
import { Context } from "../contexts/DataStore";
import { v4 as uuidv4 } from "uuid";
import MessageList from "../components/messagesBox/MessageList";
import NewMessageBox from "./../components/messagesBox/NewMessageBox";
import socket from "./../services/socket";
import { getMessages } from "../services/chatApi";
import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  UPDATE_MESSAGE_IND,
} from "./../contexts/actions/actionTypes";

function MessagesContainer() {
  const user = "test_add";
  useEffect(() => {
    console.log("messageContainer");
    getMessages()
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

  const { messageData, dispatchMessageData } = useContext(Context);

  const sendNewMessage = (message) => {
    const uniqueId = uuidv4();
    addNewMessage({ ...message, sentInd: true, _id: uniqueId });
    socket.emit("chatMessage", { message, tmpId: uniqueId });
  };

  const addNewMessage = (message) => {
    dispatchMessageData({ type: ADD_MESSAGE, ...message });
  };

  const addNewMessages = (messages) => {
    dispatchMessageData({ type: ADD_MESSAGES, messages: [...messages] });
  };
  const updateMessageInd = (data) => {
    console.log("updateMessageInd", data);
    dispatchMessageData({
      type: UPDATE_MESSAGE_IND,
      ...data.message,
      tmpId: data.tmpId,
    });
  };

  return (
    <>
      <div className="mesgs">
        <MessageList messageListProps={messageData} />
        <NewMessageBox sendNewMessage={sendNewMessage} />
      </div>
    </>
  );
}

export default MessagesContainer;
