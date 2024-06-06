const express = require('express');
const router = express.Router();
const userAdminController = require('../controllers/userAdminController');
const asyncHandler = require('../utils/asyncHandler');
const upload = require('../utils/multer');

const ExpressError = require("../utils/ExpressError");

const {ensureAuthenticated,ensureAdmin} = require("../middleware/roleMiddleware");


router.get("/login", asyncHandler(userAdminController.loginForm));
router.post("/login", asyncHandler(userAdminController.login));
router.get("/logout", asyncHandler(userAdminController.logout));

router.get("/users",ensureAuthenticated, ensureAdmin, asyncHandler(userAdminController.getAllUsers));
router.get("/users/adduser", ensureAuthenticated, ensureAdmin,asyncHandler(userAdminController.addUserForm));
router.post("/users/adduser",ensureAuthenticated, ensureAdmin, upload.single("avatar"), asyncHandler(userAdminController.addUser));
router.get("/users/:id/edit",ensureAuthenticated, ensureAdmin, asyncHandler(userAdminController.updateUserForm));
router.put("/users/:id",ensureAuthenticated, ensureAdmin, upload.single("avatar"), asyncHandler(userAdminController.updateUser));
router.delete("/users/:id",ensureAuthenticated, ensureAdmin,  asyncHandler(userAdminController.deleteUser));



router.get("/users/:id/applications",ensureAuthenticated, ensureAdmin,  asyncHandler(userAdminController.userappliedServicesForm));
router.delete("/users/application/:id",ensureAuthenticated, ensureAdmin,  asyncHandler(userAdminController.deletUserappliedServices));
router.post("/users/application/:id/sendEmail",ensureAuthenticated, ensureAdmin,  asyncHandler(userAdminController.userappliedServicesCompletedMail));


router.get("/forgetPassword", asyncHandler(userAdminController.forgetPasswordForm));
router.post("/forgetPassword", asyncHandler(userAdminController.forgetPassword));

router.get("/resetPassword", asyncHandler(userAdminController.resetPasswordForm));
router.post("/resetPassword", asyncHandler(userAdminController.resetPassword));


module.exports = router;
