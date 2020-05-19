import React from "react";

export const SingleMessage = ({
  messageFrom,
  messageText,
  messageTime,
  sentInd,
}) => {
  return (
    <div className={messageFrom === "omri1" ? "outgoing_msg" : "incoming_msg"}>
      {messageFrom === "omri1" ? null : (
        <div className="incoming_msg_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="Room"
          />
        </div>
      )}
      <div className={messageFrom === "omri1" ? "sent_msg" : "received_msg"}>
        <div className="received_withd_msg">
          <p style={{ color: sentInd ? "red" : "black" }}>{messageText}</p>
          <span className="time_date">{messageTime}</span>
        </div>
      </div>
    </div>
  );
};
