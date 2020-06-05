const { body, check, validationResult } = require("express-validator");

const validationRules = (action) => {
  switch (action) {
    case "createUser": {
      return [
        body("userName", "Invalid userName").exists(),
        body("email", "Invalid email").exists().isEmail(),
        body("phone").optional().isInt(),
        body("status").optional().isIn(["enabled", "disabled"]),
      ];
    }
    case "addMessage": {
      return [
        body("text", "Invalid text").exists().isString(),
        body("from", "Invalid from").exists().isString(),
        body("to", "Invalid to").exists().isString(),
        body("createdAt", "Invalid createdAt").exists().isString(),
      ];
    }
    case "fetchMessagesRange": {
      return [
        body("room", "Invalid room").exists().isString(),
        body("start").optional().isInt({ max: 0 }),
        body("quantity").optional().isInt({ min: 1 }),
      ];
    }
    case "addRoom": {
      return [
        check("title", "Invalid title").exists().isString(),
        check("description", "Invalid description").optional().isString(),
        check("createdBy", "Invalid createdBy").exists().isString(),
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

module.exports = {
  validationRules,
  validate,
};
