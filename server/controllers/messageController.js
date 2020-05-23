const router = require("express").Router();
const {
  fetchMessagesRange,
  addMessage,
} = require("../models/queries/messageQueries");

router.post("/range", async (req, res) => {
  const { start, quantity, room } = req.body;
  console.log("fetch", req.body);
  try {
    const result = await fetchMessagesRange(room, start, quantity);
    res.send(result.messages);
  } catch (error) {
    res.status(404).send("the id you entered is not valid");
  }
});

router.post("/:id", async (req, res) => {
  try {
    const result = await addMessage(req.body.message, req.params.id);
    console.log("addMessage", result);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.errmsgrors);
  }
});

module.exports = router;
