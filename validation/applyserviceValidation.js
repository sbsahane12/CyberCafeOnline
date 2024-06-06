const Joi = require('joi');

const serviceApplySchema = Joi.object({
  serviceId: Joi.string().allow(''), // Assuming serviceId is sent as a string
  fname: Joi.string().required(),
  mname: Joi.string().allow(''),
  lname: Joi.string().required(),
  mail: Joi.string().email().required(),
  contact: Joi.string().required(),
  whcontact: Joi.string().allow(''),
  price: Joi.number().required(),
  documentCount: Joi.number().default(0).allow(0),
  documents: Joi.array().items(Joi.string())
});

module.exports = {serviceApplySchema};
