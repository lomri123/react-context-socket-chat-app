const { body, check, validationResult } = require("express-validator");

const validationRules = (action) => {
  switch (action) {
    case "addMessage": {
      return [
        body("text", "Invalid text").exists().isString().not().isEmpty(),
        body("from", "Invalid from").exists().isString().not().isEmpty(),
        body("to", "Invalid to").exists().isString().not().isEmpty(),
        body("createdAt", "Invalid createdAt").exists().isString(),
      ];
    }
    case "fetchMessagesRange": {
      return [
        body("room", "Invalid room").exists().isString().not().isEmpty(),
        body("start").optional().isInt({ max: 0 }),
        body("quantity").optional().isInt({ min: 1 }),
      ];
    }
    case "addRoom": {
      return [
        body("title", "Invalid title").exists().isString().not().isEmpty(),
        body("description", "Invalid description").optional().isString(),
        body("createdBy", "Invalid createdBy").optional().isString(),
      ];
    }
    case "addUser": {
      return [
        body("username", "Invalid username")
          .exists()
          .isString()
          .not()
          .isEmpty(),
      ];
    }
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
const stringValidate = (str) => {
  let error = "";
  if (str.length === 0 || !str.trim())
    error = "string is empty, null or undefined";
  if (!str || /^\s*$/.test(str)) error = "string is blank, null or undefined";
  if (!str || 0 === str.length) error = "string is blank";
  return error;
};

module.exports = {
  validationRules,
  validate,
  stringValidate,
};
