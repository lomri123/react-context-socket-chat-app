import {
  ADD_MESSAGE,
  ADD_MESSAGES,
  UPDATE_MESSAGE_IND,
  SET_INITIAL_MESSAGES,
} from "../actions/actionTypes";
import arrageMessageList from "../../utils/arrageMessageList";

const reducer = (state, action) => {
  const { from, text, createdAt, type, messages, _id, tmpId, sentInd } = action;
  switch (type) {
    case ADD_MESSAGES:
      const sortedArr = arrageMessageList(messages, state);
      return sortedArr;
    case SET_INITIAL_MESSAGES:
      return messages;
    case ADD_MESSAGE:
      return [
        ...state,
        {
          from,
          text,
          createdAt,
          _id,
          sentInd,
        },
      ];
    case UPDATE_MESSAGE_IND:
      const index = state.findIndex((el) => el._id === tmpId);
      const tmpState = state;
      if (index !== -1) {
        tmpState[index]._id = _id;
        tmpState[index].sentInd = false;
      }
      return [...tmpState];
    default:
      return state;
  }
};
export default reducer;
