import React from "react";
import PropTypes from "prop-types";
import SingleRoom from "./SingleRoom";

function RoomList({ chatList, handleRoomOnClick, activeRoom }) {
  const returnRooms = () => {
    return chatList.map((room) => (
      <SingleRoom
        roomName={room.title}
        roomDesc={room.description}
        handleRoomOnClick={handleRoomOnClick}
        activeRoom={activeRoom}
        key={room._id}
        roomId={room._id}
        isImage={room.isImage}
      />
    ));
  };

  return (
    <>
      <div className="inbox_chat">{returnRooms()}</div>
    </>
  );
}

RoomList.propTypes = {
  chatList: PropTypes.array,
  handleRoomOnClick: PropTypes.func,
  activeRoom: PropTypes.string,
};

export default RoomList;
