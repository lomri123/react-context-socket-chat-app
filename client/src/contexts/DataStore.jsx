import React, { useReducer } from "react";
import messageReducer from "./reducers/messageReducer";
import roomReducer from "./reducers/roomReducer";
import activeRoomReducer from "./reducers/activeRoomReducer";
import userReducer from "./reducers/userReducer";
export const Context = React.createContext();

const initialMessageList = [];
const initialRoomList = [];
const initialActiveRoom = "5ecbd52181d79f398c36f23f";
const initialUser = {};

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
  const [userData, dispatchUserData] = useReducer(userReducer, initialUser);

  return (
    <Context.Provider
      value={{
        messageData,
        dispatchMessageData,
        roomList,
        dispatchRoomList,
        activeRoom,
        dispatchActiveRoom,
        userData,
        dispatchUserData,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Provider;
