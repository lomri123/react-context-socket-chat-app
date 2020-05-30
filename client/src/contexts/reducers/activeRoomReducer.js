import { CHANGE_ACTIVE_ROOM } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { type, room } = action;
  switch (type) {
    case CHANGE_ACTIVE_ROOM:
      return room;
    default:
      return state;
  }
};
export default reducer;
