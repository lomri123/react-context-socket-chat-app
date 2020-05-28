import React from "react";
import moment from "moment";

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
          <p className={sentInd ? "text-secondary" : ""}>{messageText}</p>
          <span className="time_date">
            {moment(messageTime).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </div>
      </div>
    </div>
  );
};
