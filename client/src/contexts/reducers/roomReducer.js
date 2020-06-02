import { ADD_ROOM, ADD_ROOMS } from "../actions/actionTypes";

const reducer = (state, action) => {
  const { title, description, _id, type, rooms } = action;
  switch (type) {
    case ADD_ROOMS:
      return [...state, ...rooms];
    case ADD_ROOM:
      return [
        {
          _id,
          title,
          description,
        },
        ...state,
      ];
    default:
      return state;
  }
};
export default reducer;
