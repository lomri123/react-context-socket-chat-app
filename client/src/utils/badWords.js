var Filter = require("bad-words");
var customFilter = new Filter();

const cleanText = (sentence) => {
  return customFilter.clean(sentence);
};

export default cleanText;
