import React, { useEffect } from "react";
import { MessageBuilder } from "./MessageBuilder";

function SingleMessage({ messageListProps }) {
  useEffect(() => {
    console.log("SingleMessage");
  });
  const messageList = messageListProps.map(msg => (
    <MessageBuilder
      messageFrom={msg.from}
      messageText={msg.messageText}
      messageTime={msg.time}
      key={msg.from + "" + msg.messageText}
    />
  ));
  return (
    <>
      <div className="msg_history">{messageList}</div>
    </>
  );
}

export default SingleMessage;
