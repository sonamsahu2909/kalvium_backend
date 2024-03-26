const mongoose = require("mongoose");
const enquireSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
},
{ timestamps: true }
);


const EnquireModel = mongoose.model("enquire", enquireSchema);
module.exports = EnquireModel;