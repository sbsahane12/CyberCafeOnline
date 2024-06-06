const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const upload = require("../utils/multer");
const serviceController = require("../controllers/serviceController");
const { isApplyValidService } = require("../middleware/applyserviceMiddleware");
const {ensureAuthenticated, ensureNormal} = require("../middleware/roleMiddleware");
router.get("/services", asyncHandler(serviceController.getAllServices));
router.get("/services/:id", asyncHandler(serviceController.getSingleService));
router.get("/services/:id/apply",ensureAuthenticated,ensureNormal, asyncHandler(serviceController.getApplyForm)); 

router.post("/services/:id",ensureAuthenticated,ensureNormal, upload.array('documents'),isApplyValidService,asyncHandler(serviceController.setApplyService));
module.exports = router;

