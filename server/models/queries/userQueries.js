const User = require("../userModel");

const fetchAllUsers = () => {
  return User.find();
};

const fetchUser = (id) => {
  return User.findById(id);
};

const authenticateUser = async (id, username) => {
  const user = await User.findById(id);
  return user.username === username;
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

const updateUser = (id, updateData) => {
  return User.findByIdAndUpdate(id, {
    $set: updateData,
  });
};

const addUser = (username) => {
  const user = {
    username,
  };
  const tmpUserSchema = new User(user);
  const result = tmpUserSchema.save();
  return result;
};

module.exports = {
  fetchAllUsers,
  deleteUser,
  updateUser,
  fetchUser,
  addUser,
  authenticateUser,
};
