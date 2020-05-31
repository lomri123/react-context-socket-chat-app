import React, { useState } from "react";
import moment from "moment";
import Avatar from "react-avatar";

function SingleMessage({
  messageFrom,
  messageText,
  messageTime,
  sentInd,
  currentUser,
}) {
  const [today] = useState(moment());
  const returnTimestamp = () => {
    if (moment(messageTime).isSame(today, "day")) {
      return moment(messageTime).format("h:mm:ss a");
    }
    return moment(messageTime).format("MMMM Do, h:mm:ss a");
  };
  return (
    <div
      className={messageFrom === currentUser ? "outgoing_msg" : "incoming_msg"}
    >
      {messageFrom === currentUser ? null : (
        <div className="incoming_msg_img pt-1">
          <Avatar
            name={messageFrom}
            src={`https://res.cloudinary.com/dgskc3t8b/image/upload/v1590802411/chat/users/${messageFrom}.png`}
            size="48px"
            maxInitials={4}
            round
          />
        </div>
      )}
      <div
        className={messageFrom === currentUser ? "sent_msg" : "received_msg"}
      >
        {messageFrom === currentUser ? null : (
          <p className="received_msg_from m-0 pl-1 font-weight-bold font-italic">
            {messageFrom}
          </p>
        )}
        <div className="received_withd_msg">
          <p className={sentInd ? "text-secondary" : ""}>{messageText}</p>
          <span className="time_date">{returnTimestamp()}</span>
        </div>
      </div>
    </div>
  );
}

export default SingleMessage;
