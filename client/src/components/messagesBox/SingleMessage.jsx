import React, { useState } from "react";
import moment from "moment";
import defaultImage from "../../assets/user-profile.png";

function SingleMessage({
  messageFrom,
  messageText,
  messageTime,
  sentInd,
  currentUser,
}) {
  const [altImage, setAltImage] = useState(null);
  const handleImageError = () => {
    setAltImage(defaultImage);
  };
  return (
    <div
      className={messageFrom === currentUser ? "outgoing_msg" : "incoming_msg"}
    >
      {messageFrom === currentUser ? null : (
        <div className="incoming_msg_img">
          <img
            src={
              altImage ||
              `https://res.cloudinary.com/dgskc3t8b/image/upload/v1590802411/chat/${messageFrom}.png`
            }
            alt="user"
            onError={() => handleImageError()}
          />
        </div>
      )}
      <div
        className={messageFrom === currentUser ? "sent_msg" : "received_msg"}
      >
        <div className="received_withd_msg">
          <p className={sentInd ? "text-secondary" : ""}>{messageText}</p>
          <span className="time_date">
            {moment(messageTime).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SingleMessage;
