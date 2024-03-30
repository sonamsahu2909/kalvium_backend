const mongoose = require("mongoose");


const OtpSchema = new mongoose.Schema({

    number : {
        type:String,
        require:true
    },
    otp: {
        type:String,
        require:true
    },
    createdAt : {type: Date, default:Date.now , index: {expiresIn: '7d'}}
    // After 5 min it deleted atomatically from the database
},{timestamps: true})
    

const OtpModal = mongoose.model("otp",OtpSchema);
module.exports = OtpModal;
