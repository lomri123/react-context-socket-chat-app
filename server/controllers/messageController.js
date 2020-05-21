const router = require("express").Router();
const {
  fetchMessagesRange,
  deleteMessage,
  updateMessage,
  addMessage,
} = require("../models/queries/messageQueries");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { start, quantity } = req.body;
  try {
    const result = await fetchMessagesRange(id, start, quantity);
    res.send(result.messages);
  } catch (error) {
    res.status(404).send("the id you entered is not valid");
  }
});

router.put("/:roomId/:messageId", async (req, res) => {
  const { roomId, messageId } = req.params;
  const { message } = req.body;
  try {
    const result = await updateMessage(roomId, messageId, message);
    res.send({ result });
  } catch (error) {
    res.status(404).send(error.errmsgrors);
  }
});

router.delete("/:roomId/:messageId", async (req, res) => {
  const { roomId, messageId } = req.params;
  try {
    const result = await deleteMessage(roomId, messageId);
    res.send({ result });
  } catch (error) {
    res.status(404).send("the id you entered is not valid");
  }
});

router.post("/:id", async (req, res) => {
  try {
    let result = await addMessage(req.body.message, req.params.id);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.errmsgrors);
  }
});

module.exports = router;
