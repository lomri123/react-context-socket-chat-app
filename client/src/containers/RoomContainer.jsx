import React, { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../contexts/DataStore";
import RoomList from "../components/roomNavigator/RoomList";
import RoomTopBar from "../components/roomNavigator/RoomTopBar";
import socket from "./../services/socket";
import { getRooms } from "./../services/roomApi";
import {
  addRoom,
  addRooms,
  changeActiveRoom,
} from "../contexts/actions/actions";
import RoomPopup from "../components/roomNavigator/RoomPopup";

function RoomContainer() {
  const {
    roomList,
    dispatchRoomList,
    activeRoom,
    dispatchActiveRoom,
  } = useContext(Context);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [roomFilter, setRoomFilter] = useState("");

  const handleRoomChange = (room) => {
    const roomDispatch = changeActiveRoom(room);
    dispatchActiveRoom(roomDispatch);
    const user = localStorage.getItem("userData");
    if (user) {
      const tmpUser = JSON.parse(user);
      tmpUser.room = room;
      localStorage.setItem("userData", JSON.stringify(tmpUser));
      socket.emit("change room", { newroom: room });
    }
  };

  const addNewRoom = (room) => {
    const roomsDispatch = addRoom(room);
    dispatchRoomList(roomsDispatch);
    handleRoomChange(room._id);
  };
  const addNewRooms = useCallback((rooms) => {
    const roomsDispatch = addRooms(rooms);
    dispatchRoomList(roomsDispatch);
  }, []);
  const handleRoomSearch = (evt) => {
    const { value } = evt.target;
    setRoomFilter(value);
  };
  const returnRoomList = (evt) => {
    return roomFilter === ""
      ? roomList
      : roomList.filter((room) =>
          room.title.toLowerCase().includes(roomFilter.toLowerCase())
        );
  };

  useEffect(() => {
    getRooms()
      .then((response) => addNewRooms(response.data.result))
      .catch((error) => console.log(error));
    socket.on("room", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <div className="inbox_people">
        <RoomTopBar handleRoomSearch={handleRoomSearch} setIsOpen={setIsOpen} />
        <RoomList
          chatList={returnRoomList()}
          handleRoomOnClick={handleRoomChange}
          activeRoom={activeRoom}
        />
      </div>
      <RoomPopup
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        addNewRoom={addNewRoom}
      />
    </>
  );
}
export default RoomContainer;
