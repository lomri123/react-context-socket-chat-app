import { ADD_MESSAGE } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { roomName, roomDesc, roomImg } = action;
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        {
          roomName,
          roomDesc,
          roomImg
        }
      ];
    default:
      return state;
  }
};
export default reducer;
