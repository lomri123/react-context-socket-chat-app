import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import cleanText from "../../utils/cleanText";
import { SendMessageButton } from "./../buttons/SendMessageButton";

function NewMessageBox({ sendNewMessage, userData }) {
  const [newMessage, updateNewMessage] = useState("");
  const messageBoxRef = useRef(null);

  const handleMessageChange = (e) => {
    let value = e.target.value;
    updateNewMessage(value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage !== "" && userData.username) {
      const cleanMessage = cleanText(newMessage);
      const currentDate = new Date();
      let tmpMessage = {
        text: cleanMessage,
        createdAt: currentDate,
      };
      sendNewMessage(tmpMessage);
      updateNewMessage("");
    }
  };

  useEffect(() => {
    messageBoxRef.current.focus();
  }, []);

  return (
    <>
      <div className="type_msg">
        <form className="input_msg_write" onSubmit={handleMessageSubmit}>
          <input
            type="text"
            className="write_msg"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => handleMessageChange(e)}
            ref={messageBoxRef}
          />
          <SendMessageButton />
        </form>
      </div>
    </>
  );
}

NewMessageBox.propTypes = {
  sendNewMessage: PropTypes.func,
  userData: PropTypes.object,
};

export default NewMessageBox;
