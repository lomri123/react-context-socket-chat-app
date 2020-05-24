import React, { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/DataStore";
import RoomList from "../components/roomNavigator/RoomList";
import RoomSearch from "../components/roomNavigator/RoomSearch";
import socket from "./../services/socket";
import { getRooms } from "./../services/chatApi";
import { addRooms, changeActiveRoom } from "../contexts/actions/actions";

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
    const roomDispatch = changeActiveRoom(room);
    dispatchActiveRoom(roomDispatch);
  };
  const addNewRooms = (rooms) => {
    const roomsDispatch = addRooms(rooms);
    dispatchRoomList(roomsDispatch);
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
