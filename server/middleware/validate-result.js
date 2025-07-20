const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed",
      success: false,
      errors: results.array() || [],
    });
  }
  next();
};

module.exports = validateResults;
