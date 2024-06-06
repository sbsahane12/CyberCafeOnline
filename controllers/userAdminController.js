const User = require('../models/user');
const cloudinary = require("../utils/cloudinary");
const fs = require("fs").promises;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { newUserSchema, updateUserSchema, emailSchema, passwordResetSchema } = require('../validation/adminValidation');
const { applicationRejectEmail, applicationCompletedEmail, adminsendPasswordResetEmail } = require('../helpers/mailer');
const UserForget = require('../models/userforget');
const randomstring = require('randomstring');
const ExpressError = require('../utils/ExpressError');
const ServiceApply = require('../models/applyservice');

const { Console } = require('console');

exports.loginForm = (req, res) => {
    res.render('useradmin/login');
};
exports.login = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err) {
                throw new ExpressError('An error occurred', 500);
            }
            if (!user) {
                throw new ExpressError('Invalid email or password', 400);
            }

            if (!user.is_verified) {
                const verificationToken = randomstring.generate();
                await UserForget.create({ user_id: user._id, token: verificationToken });
                await sendVerificationEmail(user.email, verificationToken);

                throw new ExpressError('Please verify your email before logging in. A verification email has been sent.', 400);
            }

          

            req.login(user, (err) => {
                if (err) {
                    throw new ExpressError('An error occurred', 500);
                }
                req.flash('success', 'Logged in successfully');
                res.redirect(user.role === 'admin' ? `/admin/services` : '/services');
            });
        } catch (err) {
            console.error(err);
            req.flash('error', err.message);
            res.redirect('/admin/login');
        }
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully');
        res.redirect('/admin/services');
    });
};


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        if (!users) {    
            throw new ExpressError("No users found", 404);
        }
        res.render("useradmin/users", { users });
    } catch (err) {
        throw new ExpressError("Failed to retrieve users", 500);
    }
};

exports.updateUserForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw new ExpressError("User not found", 404);
        }

        res.render("useradmin/updateuser", { user });
    } catch (err) {
        throw new ExpressError("Failed to retrieve user for update", 500);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, mobile, role, is_verified } = req.body;

        // Validate request body
        const { error } = updateUserSchema.validate(req.body);
        if (error) {
            throw new ExpressError(error.details[0].message, 400);
        }

        // Find the user by id
        const user = await User.findById(id);
        if (!user) {
            throw new ExpressError("User not found", 404);
        }

        // Check if the role is admin, and if not, prevent updating the user
        if (user.role !== 'admin') {
            throw new ExpressError("Unauthorized access", 403);
        }

        // Prepare update data
        const updateData = { username, email, mobile, role, is_verified };

        // Handle file upload for avatar if provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updateData.avatar = result.secure_url;
            await fs.unlink(req.file.path);
        }

        // Update the user
        console.log("Updating user:", id);
        console.log("Update data:", updateData);
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        console.log("User updated successfully:", updatedUser);

        req.flash("success", "User updated successfully");
        res.redirect("/admin/users");
    } catch (err) {
        console.error("Error updating user:", err);
        next(err);
    }
};


exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw new ExpressError("User not found", 404);
        }

        await User.findByIdAndDelete(id);
        if (user.avatar) {
            await cloudinary.uploader.destroy(user.avatar);
        }

        req.flash("success", "User deleted successfully");
        res.redirect("/admin/users");
    } catch (err) {
        throw new ExpressError("Failed to delete user", 500);
    }
};

exports.addUserForm = (req, res) => {
    res.render("useradmin/adduser");
};

exports.addUser = async (req, res, next) => {
    try {
        const { username, email, mobile, role, is_verified, password } = req.body;
        let avatar;

        console.log("Request Body:", req.body); // Log the request body to inspect the received data

        const { error } = newUserSchema.validate(req.body);
        if (error) {
            console.error("Validation Error:", error.message); // Log validation errors
            throw new ExpressError(error.details[0].message, 400);
        }

        console.log("Avatar File:", req.file); // Log the uploaded avatar file

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            avatar = result.secure_url;
            await fs.unlink(req.file.path);
        }

        if (mobile.length !== 10) {
            req.flash('error', 'Invalid Mobile Number');
            return res.redirect('/admin/users/adduser');
        }

        if (!username || !email || !mobile || !role) {
            req.flash('error', 'All fields are required');
            return res.redirect('/admin/users/adduser');
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            req.flash('error', 'Email already in use');
            return res.redirect('/admin/users/adduser');
        }

        const mobileExists = await User.findOne({ mobile });
        if (mobileExists) {
            req.flash('error', 'Mobile Number already in use');
            return res.redirect('/admin/users/adduser');
        }

        const user = new User({
            username,
            email,
            role: role === "admin" ? "admin" : "normal",
            mobile,
            avatar,
            is_verified: is_verified === "yes"
        });

        console.log("New User Object:", user); // Log the user object before registration

        await User.register(user, password);

        console.log("User Registered Successfully");

        req.flash('success', 'User added successfully');
        res.redirect("/admin/users");
    } catch (err) {
        console.error("Error Adding User:", err.message); // Log any errors that occur
        throw new ExpressError("Failed to add user", 500);
    }
};

exports.userappliedServicesForm = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            req.flash('error', 'You must be logged in to view your profile');
            return res.redirect('/user/login');
        }

        const user = await User.findById(id);
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/user/login');
        }

        const applications = await ServiceApply.find({ userId: user._id }).populate('serviceId');
        res.render('useradmin/single_user_appliedservices', { user, applications });
    } catch (err) {
        throw new ExpressError("Failed to retrieve user applications", 500);
    }
};

exports.deletUserappliedServices = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userdata = await ServiceApply.findById(id).populate("userId");
        if (!userdata) {
            throw new ExpressError("Application not found", 404);
        }

        await ServiceApply.findByIdAndDelete(id);
        await applicationRejectEmail(userdata.userId.email);

        req.flash("success", "Application deleted successfully");
        res.redirect("/admin/users");
    } catch (err) {
        throw new ExpressError("Failed to delete application", 500);
    }
};

exports.userappliedServicesCompletedMail = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            req.flash('error', 'You must be logged in to view your profile');
            return res.redirect('/user/login');
        }

        const user = await User.findById(id);
        if (!user) {
            req.flash('error', 'User not found');
            return;
        }

        await applicationCompletedEmail(user.email);
        req.flash("success", "Application completed successfully");
        res.redirect("/admin/users");
    } catch (err) {
        throw new ExpressError("Failed to send application completion email", 500);
    }
};

exports.forgetPasswordForm = async (req, res) => {
    try {
        res.render('useradmin/forgetPassword');
    } catch (err) {
        throw new ExpressError(err.message, err.statusCode || 500);
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        
        const { error } = emailSchema.validate(req.body);
        if (error) {
            throw new ExpressError(error.details[0].message, 400);
        }

        const { email } = req.body;
        const user = await User.findOne({ email });

        if(user.role !== 'admin') {
            throw new ExpressError('Unauthorized access', 403);
        }

        if (!user) {
            throw new ExpressError('No account found with that email', 400);
        }

        const resetToken = randomstring.generate();
        await UserForget.create({ user_id: user._id, token: resetToken });

        adminsendPasswordResetEmail(email, resetToken);

        req.flash('success', 'Password reset email sent');
        res.redirect('/user/login');
    } catch (err) {
        throw new ExpressError(err.message, err.statusCode || 500);
    }
};



exports.resetPasswordForm = async (req, res, next) => {
    try {
       
        const { token } = req.query;
        const userForget = await UserForget.findOne({ token });

        console.log(userForget)
        if (!userForget) {
            throw new ExpressError('Invalid token', 400);
        }

        res.render('useradmin/resetPassword', { token });
    } catch (err) {
        throw new ExpressError(err.message, err.statusCode || 500);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
       
        const { token } = req.body;
        const { error } = passwordResetSchema.validate(req.body);
        if (error) {
            throw new ExpressError(error.details[0].message, 400);
        }

       console.log(token)

        const { password } = req.body;
        const userForget = await UserForget.findOne({ token });


        if (!userForget) {
            throw new ExpressError('Invalid token', 400);
        }

        const user = await User.findById(userForget.user_id);
        
        if(!user) {
            throw new ExpressError('User not found', 400);
        }

        if(user.role !== 'admin') {
            throw new ExpressError('Unauthorized access', 403);
        }

        user.setPassword(password, async () => {
            await user.save();
            await UserForget.deleteMany({ user_id: userForget.user_id });

            req.flash('success', 'Password reset successfully');
            res.redirect('/user/login');
        });
    } catch (err) {
      throw new ExpressError(err.message, err.statusCode || 500);
    }
};


