const Joi = require('joi');


module.exports.emailSchema = Joi.object({
    email: Joi.string().email().required()
});

module.exports.passwordResetSchema = Joi.object({
    token: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': 'Passwords do not match' })
});

// module.exports.passwordForgetSchema = Joi.object({
//     email: Joi.string().email().required()
// });

module.exports.loginSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'normal').required()
});

module.exports.newUserSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'normal').required(),
    mobile: Joi.string().required(),
    avatar: Joi.any(),
    is_verified: Joi.string().valid('yes', 'no').default('no')
})

module.exports.updateUserSchema = Joi.object({
    username: Joi.string().required(),  
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'normal').required(),
    mobile: Joi.string().required(),
    avatar: Joi.any(),
    is_verified: Joi.boolean().default(false)
})

