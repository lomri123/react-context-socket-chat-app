import { SET_USER } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { _id, username } = action.user;
  switch (action.type) {
    case SET_USER:
      return { _id, username };
    default:
      return state;
  }
};
export default reducer;
