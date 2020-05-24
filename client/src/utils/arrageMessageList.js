const arrageMessageList = (oldArr, newArr) => {
  if (oldArr[0]._id > newArr[newArr.length - 1]) {
    return [...oldArr, ...newArr];
  }
  return [...oldArr, ...newArr].sort((a, b) => a._id - b._id);
};

export default arrageMessageList;
