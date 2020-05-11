import moment from "moment";

export const getDateTime = () => {
  return moment().format("MMMM Do YYYY, h:mm:ss a");
};
