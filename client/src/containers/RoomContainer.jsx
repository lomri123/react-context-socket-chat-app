import React, { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../contexts/DataStore";
import RoomList from "../components/roomNavigator/RoomList";
import RoomTopBar from "../components/roomNavigator/RoomTopBar";
import socket from "./../services/socket";
import { getRooms } from "./../services/chatApi";
import {
  addRoom,
  addRooms,
  changeActiveRoom,
} from "../contexts/actions/actions";

function RoomContainer() {
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
  const addNewRoom = (room) => {
    const roomsDispatch = addRoom(room);
    dispatchRoomList(roomsDispatch);
  };
  const addNewRooms = useCallback(
    (rooms) => {
      const roomsDispatch = addRooms(rooms);
      dispatchRoomList(roomsDispatch);
    },
    [dispatchRoomList]
  );
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

  useEffect(() => {
    console.log("RoomContainer");
    getRooms()
      .then((response) => addNewRooms(response.data.result))
      .catch((error) => console.log(error));
    socket.on("room", (data) => {
      console.log(data);
    });
  }, [addNewRooms]);

  return (
    <>
      <div className="inbox_people">
        <RoomTopBar
          handleRoomSearch={handleRoomSearch}
          addNewRoom={addNewRoom}
        />
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
