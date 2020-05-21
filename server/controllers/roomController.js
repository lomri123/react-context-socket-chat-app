const router = require("express").Router();
const {
  fetchAllRooms,
  fetchShallowRooms,
  deleteRoom,
  updateRoom,
  fetchRoom,
  addRoom,
} = require("../models/queries/roomQueries");

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

router.put("/", async (req, res) => {
  try {
    const result = await updateRoom(req.body.id, req.body.updateData);
    res.send({ result });
  } catch (error) {
    res.status(404).send(error.errmsgrors);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteRoom(req.params.id);
    res.send({ result });
  } catch (error) {
    res.status(404).send("the id you entered is not valid");
  }
});

router.post("/", async (req, res) => {
  console.log("called add room", req.body);
  try {
    let result = await addRoom(req.body.roomData);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.errmsgrors);
  }
});

module.exports = router;
