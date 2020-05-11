import React, { useContext, useEffect, useCallback } from "react";
import { Context } from "../contexts/DataStore";
import SingleMessage from './../components/messagesBox/SingleMessage';
import NewMessageBox from './../components/messagesBox/NewMessageBox';




function MessagesContainer() {
  const { messageData, dispatchMessageData } = useContext(Context);

  const addNewMessage = message => {
    dispatchMessageData({ type: "ADD_MESSAGE", ...message });
  };
  useEffect(() => {
    console.log("messageContainer");
  });

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
