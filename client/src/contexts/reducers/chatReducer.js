import { ADD_MESSAGE } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { from, room, messageText, time } = action;
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        {
          from,
          room,
          messageText,
          time
        }
      ];
    default:
      return state;
  }
};
export default reducer;
