import React, { useContext, useEffect } from "react";
import { Context } from "../contexts/DataStore";
import SingleRoom from "../components/roomNavigator/SingleRoom";
import RoomSearch from "../components/roomNavigator/RoomSearch";

function RoomContainer() {
  useEffect(() => {
    console.log("RoomContainer");
  });
  const {
    roomList,
    dispatchRoomList,
    activeRoom,
    dispatchActiveRoom
  } = useContext(Context);

  const handleRoomOnClick = room => {
    dispatchActiveRoom({ type: "TOGGLE_ACTIVE_ROOM", selectedRoom: room });
  };
  const handleRoomSearch = evt => {
    console.log()
  };
  return (
    <>
      <div className="inbox_people">
        <RoomSearch handleRoomSearch={handleRoomSearch}/>
        <SingleRoom
          chatListProps={roomList}
          handleRoomOnClick={handleRoomOnClick}
          activeRoomProps={activeRoom}
        />
      </div>
    </>
  );
}
export default RoomContainer;
// export const MemoRoomContainer = React.memo(RoomContainer);
