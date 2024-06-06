const Contact = require("../models/contact");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs").promises;
const {contactSchemaValditation} = require("../validation/contactValidation");

exports.getContactForm = async (req, res) => {
  res.render("contact");
};

exports.setContact = async (req, res) => {
  try {
      const { user_id, name, email, contact, message } = req.body;

    let result;
    const { error } = contactSchemaValditation.validate(req.body);
    if (error) {
      req.flash("error", error.details[0].message);
      res.redirect("/contact");
      return;
    }

    if(req.file){
         result = await cloudinary.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        req.flash("success", "Screenshot uploaded successfully");
    }
    const contactdata = new Contact({
      user_id,
      name,
      email,
      contact,
      message,
      image: result.secure_url,
    });
    await contactdata.save();
   
    req.flash("success", "Message sent successfully");
    res.redirect("/contact");
  } catch (error) {
    console.error(error);
    req.flash("error", error.message);
    res.redirect("/contact");
  }
};
