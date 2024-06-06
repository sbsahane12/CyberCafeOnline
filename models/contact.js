const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    name: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    contact: {
        type : String,
        required: true
    },
    message: {
        type : String,
        required: true
    },
    image: {
        type : String,
        required: true
    }
});

module.exports = mongoose.model('Contact', contactSchema)