import cleanText from "./cleanText";

export const validateUser = (username) => {
  if (username === "") {
    return { error: "please fill in a name" };
  }
  const isCleanName = username === cleanText(username);
  if (isCleanName) {
    if (username.length > 20) {
      return { error: "maximum 20 characters" };
    }
  } else {
    return { error: "your parents are mean :(" };
  }
  return {};
};

export const validateRoom = (roomName, roomDesc) => {
  if (roomName === "") {
    return { error: "please fill in a room name" };
  }
  const isCleanName = roomName === cleanText(roomName);
  const isCleanDesc = roomDesc === cleanText(roomDesc);
  if (isCleanName && isCleanDesc) {
    if (roomName.length > 20 || roomDesc.length > 20) {
      return { error: "maximum 20 characters" };
    }
  } else {
    return { error: "no 18+ rooms" };
  }
  return {};
};

export const validateImage = (image) => {
  if (image && image.type.substring(0, 6) !== "image/") {
    return "not a valid image file";
  } else if (image.size > 5000000) {
    return "maximum image size is 5mb";
  }
  return "";
};
