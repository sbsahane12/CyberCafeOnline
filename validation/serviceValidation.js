const Joi = require('joi');
const serviceSchema = Joi.object({
  title: Joi.string().required(), // Allow empty strings for the title
  description: Joi.string().required(),
  image: Joi.string().default("https://images.pexels.com/photos/315791/pexels-photo-315791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
  price: Joi.number().default(0).required(),
  documents: Joi.array().items(Joi.string()).required(),
  documentCount: Joi.number().default(0),
});

module.exports = { serviceSchema };