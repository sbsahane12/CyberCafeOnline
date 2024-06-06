const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceApply = require("./applyservice");

const serviceSchema = new Schema({
  title: String,
  description: String,
  image: {
    type: String,
    default: "https://images.pexels.com/photos/315791/pexels-photo-315791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    set: (v) => (v === "" ? "https://images.pexels.com/photos/315791/pexels-photo-315791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : v),
  },
  price: {
    type: Number,
    default: 0,
  },
  documents: [String],
  documentCount: Number,
});


module.exports = mongoose.model("Service", serviceSchema);
