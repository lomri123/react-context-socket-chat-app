import React from "react";
import SingleRoom from "./SingleRoom";

function RoomList({ chatListProps, handleRoomOnClick, activeRoom }) {
  const roomList = chatListProps.map((room) => (
    <SingleRoom
      roomName={room.title}
      roomDesc={room.description}
      handleRoomOnClick={handleRoomOnClick}
      activeRoom={activeRoom}
      key={room._id}
      roomId={room._id}
    />
  ));

  return (
    <>
      <div className="inbox_chat">{roomList}</div>
    </>
  );
}

export default RoomList;
