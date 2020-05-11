import React, { useReducer } from "react";
import chatReducer from "./reducers/chatReducer";
import roomReducer from "./reducers/roomReducer";
import activeRoomReducer from "./reducers/activeRoomReducer";
export const Context = React.createContext();

const initialMessageList = [
  { from: "omri1", room: "room1", messageText: "text1", time: "time" },
  { from: "omri2", room: "room2", messageText: "text2", time: "time" },
  { from: "mor1", room: "room1", messageText: "text1", time: "time" },
  { from: "mor2", room: "room2", messageText: "text2", time: "time" }
];

const initialRoomList = [
  {
    roomName: "room1",
    roomDesc: "text1",
    roomImg: "https://ptetutorials.com/images/user-profile.png"
  },
  {
    roomName: "room2",
    roomDesc: "text2",
    roomImg: "https://ptetutorials.com/images/user-profile.png"
  },
  {
    roomName: "room3",
    roomDesc: "text3",
    roomImg: "https://ptetutorials.com/images/user-profile.png"
  },
  {
    roomName: "room4",
    roomDesc: "text4",
    roomImg: "https://ptetutorials.com/images/user-profile.png"
  }
];

const initialActiveRoom = "room1";

function Provider(props) {
  const [messageData, dispatchMessageData] = useReducer(
    chatReducer,
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
