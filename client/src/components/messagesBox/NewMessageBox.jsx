import React, { useState, useRef, useEffect } from "react";
import cleanText from "./../../utils/badWords";

function NewMessageBox({ sendNewMessage }) {
  const [newMessageData, updateNewMessageData] = useState("");
  const handleMessageFormChange = (e) => {
    let value = e.target.value;
    updateNewMessageData(value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessageData !== "") {
      const cleanMessage = cleanText(newMessageData);
      const currentDate = new Date();
      let tmpMessage = {
        text: cleanMessage,
        createdAt: currentDate,
      };
      sendNewMessage(tmpMessage);
      updateNewMessageData("");
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
            value={newMessageData}
            onChange={(e) => handleMessageFormChange(e)}
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

export default NewMessageBox;
