import moment from "moment";

const compareTwoMessages = (a, b) => {
  if (
    typeof a === "object" &&
    a !== null &&
    typeof b === "object" &&
    b !== null
  ) {
    const isSameTime = moment(a?.createdAt).isSame(b?.createdAt);
    return a?.text === b?.text && a?.from === b?.from && isSameTime;
  }
  return false;
};

export default compareTwoMessages;
