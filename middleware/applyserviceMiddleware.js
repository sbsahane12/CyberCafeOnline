const { serviceApplySchema } = require("../validation/applyserviceValidation");
const ExpressError = require("../utils/ExpressError");

const isApplyValidService = (req, res, next) => {
  const { error } = serviceApplySchema.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    console.log(req.body, "Empty Body");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

module.exports = {
  isApplyValidService
};
