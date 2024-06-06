const express = require("express");
const router = express.Router();
const upload = require('../utils/multer');
const contactAdminController = require("../controllers/contactAdminController");
const ExpressError = require("../utils/ExpressError");
const asyncHandler = require("../utils/asyncHandler");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/roleMiddleware");


router.get("/contact",ensureAuthenticated, ensureAdmin, asyncHandler(contactAdminController.getContactForm));
router.get("/contact/:id",ensureAuthenticated, ensureAdmin, asyncHandler(contactAdminController.getContactById));
router.get("/contact/:userid/seen",ensureAuthenticated, ensureAdmin, asyncHandler(contactAdminController.seenContact));
router.get("/contact/:userid/delete",ensureAuthenticated, ensureAdmin, asyncHandler(contactAdminController.deleteContact));
module.exports = router;