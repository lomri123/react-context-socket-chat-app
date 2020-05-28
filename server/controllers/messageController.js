const router = require("express").Router();
const {
  fetchMessagesRange,
  addMessage,
} = require("../models/queries/messageQueries");

router.post("/range", async (req, res) => {
  const { start, quantity, room } = req.body;
  try {
    const result = await fetchMessagesRange(room, start, quantity);
    let messages = [];
    if (result && result.messages !== undefined) {
      messages = result.messages;
    }
    res.send(messages);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.errmsg);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const result = await addMessage(req.body.message, req.params.id);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.errmsg);
  }
});

module.exports = router;
