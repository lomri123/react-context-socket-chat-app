import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import cleanText from "./../../utils/badWords";

function NewMessageBox({ sendNewMessage }) {
  const [newMessage, updateNewMessage] = useState("");
  const handleMessageChange = (e) => {
    let value = e.target.value;
    updateNewMessage(value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage !== "") {
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

  const messageBoxRef = useRef(null);
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
          <button className="msg_send_btn" type="submit">
            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </>
  );
}

NewMessageBox.propTypes = {
  sendNewMessage: PropTypes.func,
};

export default NewMessageBox;
