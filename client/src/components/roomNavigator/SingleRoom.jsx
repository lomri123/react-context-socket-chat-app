import React, { useEffect } from "react";
import { RoomBuilder } from "./RoomBuilder";

function SingleRoom({
  chatListProps,
  handleRoomOnClick,
  activeRoomProps
}) {
  const roomList = chatListProps.map(room => (
    <RoomBuilder
      roomName={room.roomName}
      roomDesc={room.roomDesc}
      roomImg={room.roomImg}
      handleRoomOnClick={handleRoomOnClick}
      activeRoomProps={activeRoomProps}
      key={room.roomName}
    />
  ));

  useEffect(() => {
    console.log("singleRoom");
  });
  return (
    <>
      <div className="inbox_chat">{roomList}</div>
    </>
  );
}

export default SingleRoom;
