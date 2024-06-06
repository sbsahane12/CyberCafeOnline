const mongoose = require('mongoose');

const userForgetSchema = new mongoose.Schema({
    user_id: {
        type: String,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

const UserForget = mongoose.model('UserForget', userForgetSchema);

module.exports = UserForget;
