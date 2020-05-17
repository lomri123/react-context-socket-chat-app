import React, { useEffect } from "react";
import { MessageBuilder } from "./MessageBuilder";

function SingleMessage({ messageListProps }) {
  useEffect(() => {
    console.log("SingleMessage", messageListProps);
  });
  const messageList = messageListProps.map((msg) => (
    <MessageBuilder
      messageFrom={msg.from}
      messageText={msg.text}
      messageTime={msg.time}
      key={msg._id}
    />
  ));
  return (
    <>
      <div className="msg_history">{messageList}</div>
    </>
  );
}

export default SingleMessage;
