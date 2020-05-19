import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  UPDATE_MESSAGE_IND,
} from "../actions/actionTypes";

const reducer = (state, action) => {
  const {
    from,
    room,
    text,
    createdAt,
    type,
    messages,
    _id,
    tmpID,
    sentInd,
  } = action;
  switch (type) {
    case ADD_MESSAGES:
      return [...state, ...messages];
    case ADD_MESSAGE:
      return [
        ...state,
        {
          from,
          room,
          text,
          createdAt,
          _id,
          sentInd,
        },
      ];
    case UPDATE_MESSAGE_IND:
      const index = state.findIndex((el) => el._id === tmpID);
      const tmpState = state;
      if (index !== -1) {
        tmpState[index]._id = _id;
        sentInd = false;
      }
      return [...tmpState];
    default:
      return state;
  }
};
export default reducer;
