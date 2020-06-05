const router = require("express").Router();
const {
  deleteUser,
  updateUser,
  fetchUser,
  addUser,
} = require("../models/queries/userQueries");
const uploadToCloudinary = require("../services/cloudinary");
// const { stringValidate } = require("../middlewares/validator");
const { validationRules, validate } = require("../middlewares/validator");
const upload = require("../middlewares/multer");

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
    res.status(404).send(error.errmsg);
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

router.post(
  "/",
  upload.single("img"),
  validationRules("addUser"),
  validate,
  async (req, res) => {
    const { username } = req.body;
    let myFilePath = false;
    if (req.file !== undefined) {
      myFilePath = req.file.path;
    }
    try {
      let result = await addUser(username);
      if (myFilePath) {
        uploadToCloudinary(myFilePath, "users", username);
      }
      res.send(result);
    } catch (error) {
      let status = 404;
      if (error.code === 11000) status = 409;
      res.status(status).send(error.errmsg);
    }
  }
);

module.exports = router;
