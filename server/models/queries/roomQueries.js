const Room = require("../roomModel");

const fetchAllRooms = () => {
  return Room.find({}, { _id: 1, title: 1, description: 1 });
};

const fetchShallowRooms = () => {
  return Room.find({}, { messages: { $slice: [0, 1] } });
};

const fetchRoom = (id) => {
  return Room.findById(id);
};

const deleteRoom = (id) => {
  return Room.findByIdAndDelete(id);
};

const updateRoom = (id, updateData) => {
  return Room.findByIdAndUpdate(id, {
    $set: updateData,
  });
};

const addRoom = (RoomData) => {
  const { title, description, messages } = RoomData;
  const room = {
    title,
    description,
    messages,
  };
  const tmpRoomSchema = new Room(room);
  const result = tmpRoomSchema.save();
  return result;
};

module.exports = {
  fetchAllRooms,
  fetchShallowRooms,
  deleteRoom,
  updateRoom,
  fetchRoom,
  addRoom,
};
