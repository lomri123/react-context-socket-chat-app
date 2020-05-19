import React, { useEffect } from "react";
import { SingleMessage } from "./SingleMessage";

function MessageList({ messageListProps }) {
  useEffect(() => {
    console.log("MessageList", messageListProps);
  });
  const messageList = messageListProps.map((message) => (
    <SingleMessage
      messageFrom={message.from}
      messageText={message.text}
      messageTime={message.time}
      key={message._id}
      sentInd={message.sentInd}
    />
  ));
  return (
    <>
      <div className="msg_history">{messageList}</div>
    </>
  );
}

export default MessageList;
