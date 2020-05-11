
const Room = require("../roomModel");

const fetchAllRooms = () => {
  return Room.find().sort({ _id: -1 });
};

const fetchRoom = id => {
  return Room.findById(id);
};

const deleteRoom = id => {
  return Room.findByIdAndDelete(id);
};

const updateRoom = (id, updateData) => {
  return Room.findByIdAndUpdate(id, {
    $set: updateData
  });
};

const addRoom = RoomData => {
  const room = {
    subject: RoomData.subject,
    updatedAt: RoomData.updatedAt,
    messages: []
  };
  const tmpRoomSchema = new Room(room);
  const result = tmpRoomSchema.save();
  return result;
};

module.exports = {
  fetchAllRooms, 
  deleteRoom,
  updateRoom,
  fetchRoom,
  addRoom
};