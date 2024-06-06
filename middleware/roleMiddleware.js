// middleware/auth.js
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'You must be logged in to view this page');
        res.redirect('/user/login');
    }
};

const ensureRole = (role) => {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
            return next();
        } else {

            req.flash('error', 'You do not have permission to view this page');
            if(req.user.role === 'admin') {
                res.redirect('/admin/login');
            } else {
                res.redirect('/user/login');
            }
            
        }
    };
};

const ensureAdmin = ensureRole('admin');
const ensureNormal = ensureRole('normal');

module.exports = {
    ensureAuthenticated,
    ensureAdmin,
    ensureNormal
};
