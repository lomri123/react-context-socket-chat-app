import cleanText from "./badWords";

export const validateUser = (username) => {
  const cleanUsername = cleanText(username);
  if (username === cleanUsername) {
    if (username.length > 20) {
      return { error: "maximum 20 characters" };
    }
  } else {
    return { error: "Your parents are mean :(" };
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
