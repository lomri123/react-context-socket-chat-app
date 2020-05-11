import React from "react";

export const MessageBuilder = ({ messageFrom, messageText, messageTime }) => {
  return (
    <div
      className={messageFrom === "omri1" ? "outgoing_msg" : "incoming_msg"}
      key={messageFrom + messageText}
    >
      {messageFrom === "omri1" ? null : (
        <div className="incoming_msg_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
      )}
      <div className={messageFrom === "omri1" ? "sent_msg" : "received_msg"}>
        <div className="received_withd_msg">
          <p>{messageText}</p>
          <span className="time_date">{messageTime}</span>
        </div>
      </div>
    </div>
  );
};
