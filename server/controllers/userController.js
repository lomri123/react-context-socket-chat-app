const router = require("express").Router();
const {
  deleteUser,
  updateUser,
  fetchUser,
  addUser,
} = require("../models/queries/userQueries");

router.get("/:id", async (req, res) => {
  try {
    const result = await fetchUser(req.params.id);
    res.send({ result });
  } catch (error) {
    res.status(404).send("the id you entered is not valid");
  }
});

router.put("/", async (req, res) => {
  try {
    const result = await updateUser(req.body.id, req.body.updateData);
    res.send({ result });
  } catch (error) {
    res.status(404).send(error.errmsgrors);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.send({ result });
  } catch (error) {
    res.status(404).send("the id you entered is not valid");
  }
});

router.post("/", async (req, res) => {
  try {
    let result = await addUser(req.body.nickname);
    res.send(result);
  } catch (error) {
    let status = 404;
    if (error.code === 11000) status = 409;
    res.status(status).send(error.errmsg);
  }
});

module.exports = router;
