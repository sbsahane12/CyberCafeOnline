const Joi = require('joi');

module.exports.contactSchemaValditation = Joi.object({
    user_id: Joi.any(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.string().required(),
    message: Joi.string().required(),
    image: Joi.any(),
});
   

