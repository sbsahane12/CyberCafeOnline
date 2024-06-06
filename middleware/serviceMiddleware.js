const { serviceSchema } = require("../validation/serviceValidation");
const ExpressError = require("../utils/ExpressError");

const IsValidService = (req, res, next) => {
  const { error } = serviceSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    console.log(req.body, "Empty Body");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

module.exports = {
  IsValidService
};
