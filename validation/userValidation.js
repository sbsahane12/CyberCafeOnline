// validations/userValidation.js

const Joi = require('joi');

module.exports.registerSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Username is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please include a valid email',
        'string.empty': 'Email is required',
    }),
    mobile: Joi.string().length(10).required().messages({
        'string.length': 'Please enter a valid mobile number',
        'string.empty': 'Mobile number is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Please enter a password with 6 or more characters',
        'string.empty': 'Password is required',
    }),
    
    image: Joi.any(),
});

module.exports.emailSchema = Joi.object({
    email: Joi.string().email().required()
});

module.exports.passwordResetSchema = Joi.object({
    token: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': 'Passwords do not match' })
});

module.exports.loginSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'normal').required()
});
