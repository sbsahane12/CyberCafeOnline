// helpers/mailer.js

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendVerificationEmail = (email, token) => {
    const url = `http://localhost:3000/user/verify-email?token=${token}`;
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Email Verification',
        html: `<p>Please click <a href="${url}">here</a> to verify your email.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);
        else console.log(`Email sent: ${info.response}`);
    });
};

const sendPasswordResetEmail = (email, token) => {
    const url = `http://localhost:3000/user/resetPassword?token=${token}`;
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Password Reset',
        html: `<p>Please click <a href="${url}">here</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);
        else console.log(`Email sent: ${info.response}`);
    });
};

const adminsendPasswordResetEmail = (email, token) => {
    const url = `http://localhost:3000/admin/resetPassword?token=${token}`;
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Password Reset',
        html: `<p>Please click <a href="${url}">here</a> to reset your password.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);
        else console.log(`Email sent: ${info.response}`);
    });
};


const applicationRejectEmail = (email) => {
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Application Rejection',
        html: `<p>Your application has been rejected . please contact us <a href="mailto:sbsahane23@gmail.com">click here</a>.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);
        else console.log(`Email sent: ${info.response}`);
    });
};

const applicationCompletedEmail = (email) => {
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Application Completed',
        html: `<p>Your application has been completed .If You have any query please contact us <a href="mailto:sbsahane23@gmail.com">click here</a>.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);
        else console.log(`Email sent: ${info.response}`);
    });
};

const problemSeenEmail = (email) => {
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Problem Seen',
        html: `<p>Your problem has been seen .If You have any query please contact us <a href="mailto:sbsahane23@gmail.com">click here</a>.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);    
        else console.log(`Email sent: ${info.response}`);
    });
};

const problemSolvedEmail = (email) => {
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Problem Solved',
        html: `<p>Your problem has been solved .If You have any query please contact us <a href="mailto:sbsahane23@gmail.com">click here</a>.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);
        else console.log(`Email sent: ${info.response}`);
    });
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
    applicationRejectEmail,
    applicationCompletedEmail,
    adminsendPasswordResetEmail,
    problemSeenEmail,
    problemSolvedEmail,
};
