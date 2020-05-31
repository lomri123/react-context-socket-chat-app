import React, { useState } from "react";
import Avatar from "react-avatar";

function SingleRoom({
  roomName,
  roomDesc,
  handleRoomOnClick,
  activeRoom,
  roomId,
}) {
  return (
    <div
      className={`chat_list ${roomId === activeRoom ? "active_chat" : ""}`}
      onClick={() => handleRoomOnClick(roomId)}
    >
      <div className="chat_people">
        <div className="chat_img">
          <Avatar
            name={roomName}
            src={`https://res.cloudinary.com/dgskc3t8b/image/upload/v1590802411/chat/rooms/${roomName}.png`}
            size="48px"
            maxInitials={4}
            round
          />
        </div>
        <div className="chat_ib">
          <h5>{roomName}</h5>
          <p>{roomDesc}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleRoom;
