import React, { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/DataStore";
import RoomList from "../components/roomNavigator/RoomList";
import RoomSearch from "../components/roomNavigator/RoomSearch";
import socket from "./../services/socket";
import { getRooms } from "./../services/chatApi";
import { CHANGE_ACTIVE_ROOM, ADD_ROOMS } from "../contexts/actions/actionTypes";

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

  const [roomFilter, setRoomFilter] = useState("");

  const handleRoomOnClick = (room) => {
    dispatchActiveRoom({ type: CHANGE_ACTIVE_ROOM, selectedRoom: room });
  };
  const addNewRooms = (rooms) => {
    console.log(rooms);
    dispatchRoomList({ type: ADD_ROOMS, rooms });
  };
  const handleRoomSearch = (evt) => {
    const { value } = evt.target;
    setRoomFilter(value);
  };
  const returnRoomList = (evt) => {
    console.log(roomList);
    return roomFilter === ""
      ? roomList
      : roomList.filter(
          (room) => room.title.toLowerCase() === roomFilter.toLowerCase()
        );
  };

  return (
    <>
      <div className="inbox_people">
        <RoomSearch handleRoomSearch={handleRoomSearch} />
        <RoomList
          chatListProps={returnRoomList()}
          handleRoomOnClick={handleRoomOnClick}
          activeRoomProps={activeRoom}
        />
      </div>
    </>
  );
}
export default RoomContainer;
// export const MemoRoomContainer = React.memo(RoomContainer);
