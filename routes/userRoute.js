// routes/userRoute.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');
const asyncHandler = require('../utils/asyncHandler');
const upload = require('../utils/multer');
const {registerSchema, emailSchema, passwordResetSchema, loginSchema} = require('../validation/userValidation');

const {ensureAuthenticated, ensureNormal, ensureAdmin} = require('../middleware/roleMiddleware');

const IsValidRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new Error(msg);
    } else {
        next();
    }   
}

const IsValidEmail = (req, res, next) => {
    const { error } = emailSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new Error(msg);
    } else {
        next();
    }   
}

const IsValidPasswordReset = (req, res, next) => {
    const { error } = passwordResetSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new Error(msg);
    } else {
        next();
    }   
}

const IsValidLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new Error(msg);
    } else {
        next();
    }   
}


router.get('/profile/:id', ensureAuthenticated,asyncHandler(authController.profile));
router.put('/profile/:id', ensureAuthenticated,ensureNormal,upload.single('avatar'), asyncHandler(authController.updateProfileForm));

router.get("/application/:id",ensureAuthenticated,ensureNormal,  asyncHandler(authController.applicationForm));
router.put("/application/:id", ensureAuthenticated, ensureNormal, upload.array('new_documents'), asyncHandler(authController.updateApplicationForm));
  
router.post('/signup', upload.single('avatar') , asyncHandler(authController.signup));
router.get('/signup', asyncHandler(authController.signupForm));

router.get('/login', asyncHandler(authController.loginForm));
router.post('/login', IsValidLogin, asyncHandler(authController.login));

router.get('/logout', asyncHandler(authController.logout));

router.get('/verify-email', asyncHandler(authController.verifyEmail));
router.get('/forgetPassword', asyncHandler(authController.forgetPasswordForm));
router.post('/forgetPassword', asyncHandler(authController.forgetPassword));

router.get('/resetPassword', asyncHandler(authController.resetPasswordForm));
router.post('/resetPassword', asyncHandler(authController.resetPassword));


module.exports = router;
