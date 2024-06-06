const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceApplySchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fname: String,
  mname: String,
  lname: String,
  mail: String,
  contact: String,
  whcontact: String,
  price: Number,
  documents: [String]
});

module.exports = mongoose.model("ServiceApply", serviceApplySchema);
