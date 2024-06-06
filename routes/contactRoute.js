const express = require("express");
const router = express.Router();
const upload = require('../utils/multer');
const contactController = require("../controllers/contactController");
const ExpressError = require("../utils/ExpressError");
const asyncHandler = require("../utils/asyncHandler");
const { ensureAuthenticated, ensureNormal } = require("../middleware/roleMiddleware");

router.get("/contact", ensureAuthenticated,ensureNormal, asyncHandler(contactController.getContactForm));
router.post("/contact",ensureAuthenticated, ensureNormal, upload.single("image"), asyncHandler(contactController.setContact));

module.exports = router;
