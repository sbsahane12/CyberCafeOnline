// app.js

const { config } = require('dotenv');
config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const connectFlash = require('connect-flash');
const ensureRole = require('./middleware/roleMiddleware');
const ExpressError = require('./utils/ExpressError');
const { error } = require('console');
async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB connected');
}

main().catch(console.error);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
});



app.use("/privacy",async (req, res) => {
    res.render('privacy');
})
app.use('/terms',async (req, res) => {
    res.render('terms-and-conditions');
})


app.use('/', require('./routes/index'));
app.use('/', require('./routes/contactRoute'));
app.use('/', require('./routes/serviceRoute')); //normal routes
app.use('/user', require('./routes/userRoute')); //normal routes
app.use('/admin', require('./routes/adminContactRoute')); //admin routes
app.use('/admin', require('./routes/adminServicesRoute')); //admin routes
app.use('/admin', require('./routes/adminUserRoute'));  //admin routes


// Centralized error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    if (!err.message) err.message = "Oh no, something went wrong!";
    res.status(statusCode).render('error', { err });
});

console.log('SMTP_MAIL:', process.env.SMTP_MAIL);
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);



app.use("*", (req, res) => {
   res.render("error", { err: { message: "Page Not Found", status: 404 }});
});
const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
