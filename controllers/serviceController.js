const Service = require("../models/service");
const ServiceApply = require("../models/applyservice");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs").promises;
const ExpressError = require("../utils/ExpressError");

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({});
    if(!services){
      req.flash("error", "No services found");
      return next(new ExpressError("No services found", 404));
    }
    res.render("cybercafe/Services", { services });
  } catch (err) {
    next(new ExpressError("Failed to retrieve services", 500));
  }
};

exports.getSingleService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      req.flash("error", "Service not found");
      return next(new ExpressError("Service not found", 404));
    }
    res.render("cybercafe/SingleService", { service });
  } catch (err) {
    next(new ExpressError("Failed to retrieve the service", 500));
  }
};

exports.getApplyForm = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      req.flash("error", "Service not found");
      return next(new ExpressError("Service not found", 404));
    }
    res.render("cybercafe/Apply", { service });
  } catch (err) {
    next(new ExpressError("Failed to retrieve the apply form", 500));
  }
};

const uploadWithRetry = async (filePath, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await cloudinary.uploader.upload(filePath);
      await fs.unlink(filePath);
      return result.secure_url;
    } catch (error) {
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw new ExpressError("Failed to upload file to Cloudinary", 500);
      }
    }
  }
};

exports.setApplyService = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      req.flash('error', 'Please login first');
      return res.status(401).send('Unauthorized');
    }

    const { fname, mname, lname, mail, contact, whcontact, price } = req.body;
    const serviceId = req.params.id;

    const documents = req.files.map(file => file.path);
    const uploadedDocuments = await Promise.all(documents.map(filePath => uploadWithRetry(filePath)));

    const newApplyService = new ServiceApply({
      serviceId,
      userId: req.user._id,
      fname,
      mname,
      lname,
      mail,
      contact,
      whcontact,
      price,
      documents: uploadedDocuments
    });

    await newApplyService.save();

    req.flash('success', 'Application submitted successfully');
    res.redirect("/services/" + req.params.id);
  } catch (error) {
    next(error);
  }
};
