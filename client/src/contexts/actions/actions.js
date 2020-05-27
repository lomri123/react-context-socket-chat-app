import {
  SET_USER,
  CHANGE_ACTIVE_ROOM,
  ADD_MESSAGE,
  ADD_MESSAGES,
  UPDATE_MESSAGE_IND,
  ADD_ROOM,
  ADD_ROOMS,
} from "./actionTypes";

export const setUser = (user) => {
  return { type: SET_USER, user };
};

export const changeActiveRoom = (room) => {
  return { type: CHANGE_ACTIVE_ROOM, ...room };
};

export const addMessage = (message) => {
  return { type: ADD_MESSAGE, ...message };
};

export const addMessages = (messages) => {
  return { type: ADD_MESSAGES, messages: [...messages] };
};

export const updateMessageInd = (data) => {
  return {
    type: UPDATE_MESSAGE_IND,
    ...data.message,
    tmpId: data.tmpId,
  };
};

export const addRoom = (room) => {
  return { type: ADD_ROOM, room };
};
export const addRooms = (rooms) => {
  return { type: ADD_ROOMS, rooms };
};
