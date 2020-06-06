import React, { useState } from "react";
import PropTypes from "prop-types";
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
  const isCurrent = messageFrom === currentUser ? true : false;
  const wrapperClassName = isCurrent ? "outgoing_msg" : "incoming_msg";
  const senderClassName = isCurrent ? "sent_msg" : "received_msg";
  const avatarSrc = `https://res.cloudinary.com/dgskc3t8b/image/upload/v1590802411/chat/users/${messageFrom}.png`;
  const sentIndClassName = sentInd ? "text-secondary" : "";

  const formatTimestamp = () => {
    if (moment(messageTime).isSame(today, "day")) {
      return moment(messageTime).format("h:mm:ss a");
    }
    return moment(messageTime).format("MMMM Do, h:mm:ss a");
  };

  return (
    <div className={wrapperClassName}>
      {isCurrent ? null : (
        <div className="incoming_msg_img pt-1">
          <Avatar
            name={messageFrom}
            src={avatarSrc}
            size="48px"
            maxInitials={4}
            round
          />
        </div>
      )}
      <div className={senderClassName}>
        {messageFrom === currentUser ? null : (
          <p className="received_msg_from m-0 pl-1 font-weight-bold font-italic">
            {messageFrom}
          </p>
        )}
        <div className="received_withd_msg">
          <p className={sentIndClassName}>{messageText}</p>
          <span className="time_date">{formatTimestamp()}</span>
        </div>
      </div>
    </div>
  );
}

SingleMessage.propTypes = {
  messageFrom: PropTypes.string,
  messageText: PropTypes.string,
  messageTime: PropTypes.string,
  sentInd: PropTypes.bool,
  currentUser: PropTypes.string,
};

export default SingleMessage;
