import React, { useContext, useEffect, useCallback } from "react";
import { Context } from "../contexts/DataStore";
import { v4 as uuidv4 } from "uuid";
import MessageList from "../components/messagesBox/MessageList";
import NewMessageBox from "./../components/messagesBox/NewMessageBox";
import socket from "./../services/socket";
import { getMessages } from "../services/chatApi";
import {
  addMessage,
  addMessages,
  updateMessageInd,
} from "./../contexts/actions/actions";

function MessagesContainer() {
  const { messageData, dispatchMessageData, activeRoom, userData } = useContext(
    Context
  );

  const sendNewMessage = (message) => {
    const uniqueId = uuidv4();
    const myMessage = { ...message, from: userData.username, room: activeRoom };
    addNewMessage({ ...myMessage, sentInd: true, _id: uniqueId });
    socket.emit("chatMessage", { message, tmpId: uniqueId });
  };

  const addNewMessage = useCallback(
    (message) => {
      const dispatchMessage = addMessage(message);
      dispatchMessageData(dispatchMessage);
    },
    [dispatchMessageData]
  );

  const addNewMessages = useCallback(
    (messages) => {
      if (messages.length > 0) {
        const dispatchMessages = addMessages(messages);
        dispatchMessageData(dispatchMessages);
      }
    },
    [dispatchMessageData]
  );
  const updateNewMessageInd = useCallback(
    (data) => {
      const dispatchMessage = updateMessageInd(data);
      dispatchMessageData(dispatchMessage);
    },
    [dispatchMessageData]
  );

  const handleIncomingMessage = useCallback(
    (data) => {
      if (data.message.from === userData?.username) {
        updateNewMessageInd(data);
      } else {
        addNewMessage(data.message);
      }
    },
    [addNewMessage, updateNewMessageInd, userData]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMessages(activeRoom);
        addNewMessages(data);
      } catch (error) {
        console.log("getMessages error", error);
      }
    };
    fetchData();
    socket.on("message", (data) => handleIncomingMessage(data));
  }, []);

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
