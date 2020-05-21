import { CHANGE_ACTIVE_ROOM } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { selectedRoom } = action;
  switch (action.type) {
    case CHANGE_ACTIVE_ROOM:
      return selectedRoom;
    default:
      return state;
  }
};
export default reducer;
