import React, { useState } from "react";
import defaultImage from "../../assets/user-profile.png";

function SingleRoom({
  roomName,
  roomDesc,
  handleRoomOnClick,
  activeRoomProps,
}) {
  const [altImage, setAltImage] = useState(null);
  const handleImageError = () => {
    setAltImage(defaultImage);
  };
  return (
    <div
      className={`chat_list ${
        roomName === activeRoomProps ? "active_chat" : ""
      }`}
      onClick={() => handleRoomOnClick(roomName)}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src={
              altImage ||
              `https://res.cloudinary.com/dgskc3t8b/image/upload/v1590802411/chat/rooms/${roomName}.png`
            }
            alt="user"
            onError={() => handleImageError()}
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
