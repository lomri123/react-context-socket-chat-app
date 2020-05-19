import React, { useContext, useEffect } from "react";
import { Context } from "../contexts/DataStore";
import RoomList from "../components/roomNavigator/RoomList";
import RoomSearch from "../components/roomNavigator/RoomSearch";
import socket from "./../services/socket";
import { getRooms } from "./../services/chatData";

function RoomContainer() {
  useEffect(() => {
    console.log("RoomContainer");
    getRooms()
      .then((response) => addNewRooms(response.data.result))
      .catch((error) => console.log(error));
    socket.on("room", (data) => {
      console.log(data);
    });
  }, []);
  const {
    roomList,
    dispatchRoomList,
    activeRoom,
    dispatchActiveRoom,
  } = useContext(Context);

  const handleRoomOnClick = (room) => {
    dispatchActiveRoom({ type: "TOGGLE_ACTIVE_ROOM", selectedRoom: room });
  };
  const addNewRooms = (rooms) => {
    console.log(rooms);
    dispatchRoomList({ type: "ADD_ROOMS", rooms });
  };
  const handleRoomSearch = (evt) => {
    console.log(evt);
  };
  return (
    <>
      <div className="inbox_people">
        <RoomSearch handleRoomSearch={handleRoomSearch} />
        <RoomList
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
