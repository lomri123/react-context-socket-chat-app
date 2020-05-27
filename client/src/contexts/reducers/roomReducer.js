import { ADD_ROOM, ADD_ROOMS } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { roomName, roomDesc, roomImg, type, rooms } = action;
  switch (type) {
    case ADD_ROOMS:
      return [...state, ...rooms];
    case ADD_ROOM:
      return [
        {
          roomName,
          roomDesc,
          roomImg,
        },
        ...state,
      ];
    default:
      return state;
  }
};
export default reducer;
