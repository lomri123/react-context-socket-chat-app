import React, { useReducer } from "react";
import messageReducer from "./reducers/messageReducer";
import roomReducer from "./reducers/roomReducer";
import activeRoomReducer from "./reducers/activeRoomReducer";
export const Context = React.createContext();

const initialMessageList = [];
const initialRoomList = [
  {
    roomName: "Lobby",
    roomDesc: "Landing room",
    roomImg: "https://ptetutorials.com/images/user-profile.png",
    _id: "5ec176fdd9b4cb42dc2b2181"
  }
];
const initialActiveRoom = "5ec176fdd9b4cb42dc2b2181";

function Provider(props) {
  const [messageData, dispatchMessageData] = useReducer(
    messageReducer,
    initialMessageList
  );
  const [roomList, dispatchRoomList] = useReducer(roomReducer, initialRoomList);
  const [activeRoom, dispatchActiveRoom] = useReducer(
    activeRoomReducer,
    initialActiveRoom
  );

  return (
    <Context.Provider
      value={{
        messageData,
        dispatchMessageData,
        roomList,
        dispatchRoomList,
        activeRoom,
        dispatchActiveRoom
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Provider;
