const Service = require("../models/service");
const ExpressError = require("../utils/ExpressError");
const cloudinary = require("../utils/cloudinary");
const ServiceApply = require("../models/applyservice");
const User = require("../models/user");
const fs = require("fs").promises;

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/user/login');
    }
    const applications = await ServiceApply.find({ userId: user._id }).populate('serviceId');
    res.render('useradmin/profile', { user, applications });
  } catch (err) {
    next(new ExpressError("Failed to get user profile", 500));
  }
};


exports.updateProfileForm = async (req, res) => {
  try {
      const { username, mobile } = req.body;
      const userId = req.params.id;

      const user = await User.findById(userId);
      if (!user) {
          throw new ExpressError('User not found', 404);
      }

      // if (!username || username.length < 7) {
      //     throw new ExpressError('Username must be at least 7 characters long', 400);
      // }

      // if (!mobile || mobile.length !== 10) {
      //     throw new ExpressError('Invalid mobile number', 400);
      // }

      if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          user.avatar = result.secure_url;
          await fs.unlink(req.file.path);
      }

      user.username = username;
      user.mobile = mobile;
      await user.save();

      req.flash('success', 'Profile updated successfully');
      res.redirect(`/admin/profile/${userId}`);
  } catch (error) {
      console.error(error);
      req.flash('error', error.message);
      res.redirect(`/admin/profile/${req.params.id}`);
  }
};




exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({});
    res.render('useradmin/services.ejs', { services });
  } catch (err) {
    next(new ExpressError("Failed to retrieve services", 500));
  }
};

exports.getNewServiceForm = (req, res) => {
  res.render("cyberCafe/newService");
};

exports.createService = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ExpressError("No file uploaded", 400);
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);

    const imageUrl = result.secure_url;

    const service = new Service({
      title: req.body.title,
      description: req.body.description,
      image: imageUrl,
      price: req.body.price,
      documents: req.body.documents || [],
      documentCount: req.body.documents ? req.body.documents.length : 0,
    });

    await service.save();
    res.redirect("/admin/services");
  } catch (err) {
    next(new ExpressError("Failed to create service", 500));
  }
};

exports.getSingleService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      throw new ExpressError("Service not found", 404);
    }
    res.render("cybercafe/SingleService", { service });
  } catch (err) {
    next(new ExpressError("Failed to retrieve service", 500));
  }
};

exports.getEditServiceForm = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      throw new ExpressError("Service not found", 404);
    }
    res.render("cybercafe/EditService", { service });
  } catch (err) {
    next(new ExpressError("Failed to retrieve service for editing", 500));
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      throw new ExpressError("Service not found", 404);
    }

    service.title = req.body.title;
    service.description = req.body.description;
    service.price = req.body.price;
    service.documents = req.body.documents || [];
    service.documentCount = req.body.documents ? req.body.documents.length : 0;

    if (req.file) {
      await cloudinary.uploader.destroy(service.image);
      const result = await cloudinary.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);

      service.image = result.secure_url;
    }

    await service.save();
    res.redirect("/admin/services");
  } catch (err) {
    next(new ExpressError("Failed to update service", 500));
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      throw new ExpressError("Service not found", 404);
    }

    // Delete associated ServiceApply documents
    await ServiceApply.deleteMany({ serviceId: service._id });

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(service.image);

    // Delete the Service itself
    await Service.findByIdAndDelete(service._id);

    res.redirect("/admin/services");
  } catch (err) {
    next(new ExpressError("Failed to delete service", 500));
  }
};
