import { ADD_MESSAGE, ADD_MESSAGES } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { from, room, messageText, time, type, messages } = action;
  switch (type) {
    case ADD_MESSAGES:
      return [...state, ...messages];
    case ADD_MESSAGE:
      return [
        ...state,
        {
          from,
          room,
          messageText,
          time,
        },
      ];
    default:
      return state;
  }
};
export default reducer;
