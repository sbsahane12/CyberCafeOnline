const Contact = require("../models/contact");
const User = require("../models/user");
const { problemSeenEmail, problemSolvedEmail } = require("../helpers/mailer");
exports.getContactForm = async (req, res) => {
  try {
    // Find all contacts and populate the user_id field
    const contacts = await Contact.find({}).populate("user_id").exec();

    // Render the template and pass the contacts with user information
    res.render("useradmin/userContact", { contacts });
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to fetch contacts");
    res.redirect("/admin/contact");
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.render("useradmin/userContactProblem", { contact });
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to fetch contact");
    res.redirect("/admin/contact");
  }
};

exports.seenContact = async (req, res) => {
  try {
    console.log(req.params.userid);
    const user = await User.findById(req.params.userid);
    console.log(user);
    const email = user.email;

    await problemSeenEmail(email);
    req.flash("success", "Contact marked as seen");
    res.redirect("/admin/contact");
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to mark contact as seen");
    res.redirect("/admin/contact");
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    const contact = await Contact.deleteOne({user_id: req.params.userid});

    
    const email = user.email;
    await problemSolvedEmail(email);
    req.flash("success", "Contact deleted successfully & contact marked as solved");
    res.redirect("/admin/contact");
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to delete contact");
    res.redirect("/admin/contact");
  }
};
