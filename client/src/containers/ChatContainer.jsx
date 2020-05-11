import React, { useEffect } from "react";
import RoomContainer from "./RoomContainer";
import MessagesContainer from "../containers/MessageContainer";

function ChatContainer() {
  useEffect(() => {
    console.log("chatContainer");
  });

  return (
    <>
      <div className="messaging">
        <div className="inbox_msg">
          <RoomContainer />
          <MessagesContainer />
        </div>
      </div>
    </>
  );
}

export default ChatContainer;
