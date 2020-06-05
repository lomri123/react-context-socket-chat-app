const router = require("express").Router();
const {
  fetchAllRooms,
  fetchRoom,
  addRoom,
} = require("../models/queries/roomQueries");
const uploadToCloudinary = require("../services/cloudinary");
const upload = require("../middlewares/multer");
const { stringValidate } = require("../middlewares/validator");
router.get("/", async (req, res) => {
  try {
    const result = await fetchAllRooms();
    res.send({ result });
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await fetchRoom(req.params.id);
    res.send({ result });
  } catch (error) {
    res.status(404).send("the id you entered is not valid");
  }
});

router.post("/", upload.single("img"), async (req, res) => {
  const parsedRoomData = JSON.parse(req.body.roomData);
  const roomValidate = stringValidate(parsedRoomData.title);
  if (roomValidate !== "") {
    res.status(404).send(roomValidate);
  } else {
    try {
      let myFilePath = false;
      if (req.file !== undefined) {
        myFilePath = req.file.path;
      }
      const myRoomData = { ...parsedRoomData, messages: [] };
      console.log("new room", myRoomData, myFilePath);
      let result = await addRoom(myRoomData);
      if (myFilePath) {
        uploadToCloudinary(myFilePath, "rooms", myRoomData.title);
      }
      res.send(result);
    } catch (error) {
      res.status(404).send(error.errmsg);
    }
  }
});

module.exports = router;
