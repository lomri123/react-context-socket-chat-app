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
