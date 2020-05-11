const router = require("express").Router();
const {
  fetchAllTodos,
  deleteTodo,
  updateTodo,
  fetchTodo,
  addTodo
} = require("./listQueries");

router.get("/", async (req, res) => {
  try {
    const result = await fetchAllTodos();
    res.send({ result });
  } catch (ex) {
    res.status(404).send("something went wrong");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await fetchTodo(req.params.id);
    res.send({ result });
  } catch (ex) {
    res.status(404).send("the id you entered is not valid");
  }
});

router.put("/", async (req, res) => {
  try {
    const result = await updateTodo(req.body.id, req.body.updateData);
    res.send({ result });
  } catch (ex) {
    res.status(404).send(ex.errors);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteTodo(req.params.id);
    res.send({ result });
  } catch (ex) {
    res.status(404).send("the id you entered is not valid");
  }
});

router.post("/", async (req, res) => {
  try {
    let result = await addTodo(req.body.todoData);
    res.send(result);
  } catch (ex) {
    res.status(404).send(ex.errors);
  }
});

module.exports = router;