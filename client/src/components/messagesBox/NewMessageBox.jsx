import React, { useEffect, useState, useCallback } from "react";
import { getDateTime } from "../../utils/getDateTime";

function NewMessageBox({ sendNewMessage }) {
  const [newMessageData, updateNewMessageData] = useState("");
  const handleMessageFormChange = (e) => {
    let value = e.target.value;
    updateNewMessageData(value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessageData !== "") {
      let tmpMessage = {
        from: "test_add",
        room: "test_room",
        text: newMessageData,
        createdAt: getDateTime(),
      };
      sendNewMessage(tmpMessage);
      updateNewMessageData("");
    }
  };
  useEffect(() => {
    console.log("NewMessageBox");
  });
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
