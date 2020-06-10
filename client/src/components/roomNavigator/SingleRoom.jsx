import React from "react";
import PropTypes from "prop-types";
import Avatar from "react-avatar";

function SingleRoom({
  roomName,
  roomDesc,
  handleRoomOnClick,
  activeRoom,
  roomId,
  isImage,
}) {
  const avatarSrc = `https://res.cloudinary.com/dgskc3t8b/image/upload/w_48,h_48,c_scale/v1590802411/chat/rooms/${roomName}`;

  return (
    <div
      className={`chat_list ${roomId === activeRoom ? "active_chat" : ""}`}
      onClick={() => handleRoomOnClick(roomId)}
    >
      <div className="row chat_room">
        <div className="col-2">
          <Avatar
            name={roomName}
            src={isImage ? avatarSrc : ""}
            size="48px"
            maxInitials={4}
            round
          />
        </div>
        <div className="chat_ib col-10 ">
          <div className="ml-2">
            <h5>{roomName}</h5>
            <p>{roomDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

SingleRoom.propTypes = {
  handleRoomOnClick: PropTypes.func,
  roomName: PropTypes.string,
  roomDesc: PropTypes.string,
  activeRoom: PropTypes.string,
  roomId: PropTypes.string,
};

export default SingleRoom;
