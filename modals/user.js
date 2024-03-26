const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      require: true,
    },
    // otpExpiration:{

    // }
  },
  { timestamps: true }
);

UserSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        _id:this._id,
        number:this.number
    },process.env.JWT_SECRET_KEY,{expiresIn: "7d"})
    return token
}

const UserModal = mongoose.model("users", UserSchema);
module.exports = UserModal;
