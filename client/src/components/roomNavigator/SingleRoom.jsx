import React from "react";

export const SingleRoom = ({
  roomName,
  roomDesc,
  roomImg,
  handleRoomOnClick,
  activeRoomProps,
}) => {
  return (
    <div
      className={`chat_list ${
        roomName === activeRoomProps ? "active_chat" : ""
      }`}
      onClick={() => handleRoomOnClick(roomName)}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img src={roomImg} alt="sunil" />
        </div>
        <div className="chat_ib">
          <h5>{roomName}</h5>
          <p>{roomDesc}</p>
        </div>
      </div>
    </div>
  );
};
