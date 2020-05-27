var Filter = require("bad-words");
var customFilter = new Filter();

const cleanMessage = (sentence) => {
  return customFilter.clean(sentence);
};

export default cleanMessage;
