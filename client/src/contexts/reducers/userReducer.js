import { ADD_USER } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { _id, nickname } = action.user;
  switch (action.type) {
    case ADD_USER:
      return { _id, nickname };
    default:
      return state;
  }
};
export default reducer;
