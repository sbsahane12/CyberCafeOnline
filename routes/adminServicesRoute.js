const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const upload = require("../utils/multer");
const serviceController = require("../controllers/serviceAdminController");
const serviceAdminController = require("../controllers/serviceAdminController");
const { IsValidService } = require("../middleware/serviceMiddleware");
const {ensureAuthenticated,ensureAdmin} = require("../middleware/roleMiddleware");


router.get("/profile/:id",ensureAuthenticated, ensureAdmin, asyncHandler(serviceAdminController.getProfile));
router.put('/profile/:id', ensureAuthenticated, ensureAdmin, upload.single('avatar'), asyncHandler(serviceAdminController.updateProfileForm));
router.get('/services',ensureAuthenticated, ensureAdmin, asyncHandler(serviceController.getAllServices));
router.get("/services/new", ensureAuthenticated, ensureAdmin,asyncHandler(serviceController.getNewServiceForm)); // New service creation route
router.post("/services", ensureAuthenticated, ensureAdmin,upload.single("image"), IsValidService, asyncHandler(serviceController.createService));
router.get("/services/:id/edit",ensureAuthenticated, ensureAdmin, asyncHandler(serviceController.getEditServiceForm));
router.put("/services/:id",ensureAuthenticated, ensureAdmin, upload.single("image"), IsValidService, asyncHandler(serviceController.updateService));
router.delete("/services/:id", ensureAuthenticated, ensureAdmin,asyncHandler(serviceController.deleteService));

module.exports = router;
