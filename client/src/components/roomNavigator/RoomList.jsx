import React from "react";
import { SingleRoom } from "./SingleRoom";

function RoomList({ chatListProps, handleRoomOnClick, activeRoomProps }) {
  const roomList = chatListProps.map((room) => (
    <SingleRoom
      roomName={room.title}
      roomDesc={room.description}
      roomImg={room.roomImg}
      handleRoomOnClick={handleRoomOnClick}
      activeRoomProps={activeRoomProps}
      key={room._id}
    />
  ));

  return (
    <>
      <div className="inbox_chat">{roomList}</div>
    </>
  );
}

export default RoomList;
