const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv").config();
const twilio = require("twilio");
// Define OTP expiry duration in milliseconds (e.g., 5 minutes)
const OTP_EXPIRY_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = "+18142508747";

const twilioClient = require("twilio")(accountSid, authToken);

const UserModal = require("../modals/user");
const OtpModal = require("../modals/otp");

class UserController {
  static signUp = async (req, res) => {
    try {
      const user = await UserModal.findOne({
        number: req.body.number,
      });
      if (user) return res.status(400).send("user already registerd!");
      const OTP = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const number = req.body.number;
      console.log(OTP);

      // await twilioClient.messages.create({
      //   from: fromNumber,
      //   body: `Your OTP is : ${OTP}`,
      //   to:'+91' + [number],
      // }).then(message => console.log(message.sid))

      const otp = new OtpModal({ number: number, otp: OTP });
      console.log(otp);
      const salt = await bcrypt.genSalt(10);
      otp.otp = await bcrypt.hash(otp.otp, salt);
      const result = await otp.save();
      // console.log(result)
      return res.status(200).json({
        success: true,
        message: "Otp send successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  static verifyOtp = async (req, res) => {
    try {
      const otpHolder = await OtpModal.find({
        number: req.body.number,
        // otp:req.body.otp
      });
      if (otpHolder.length === 0)
        return res.status(400).send("you are expired otp!");
      const rightOtpFind = otpHolder[otpHolder.length - 1];
      // console.log(rightOtpFind);
      const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
      console.log(validUser)
      if (rightOtpFind.number === req.body.number && validUser) {
        // if (rightOtpFind.number === req.body.number ) {
        const user = new UserModal(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OPTDelete = await OtpModal.deleteMany({
          number: rightOtpFind.number,
        });
        console.log(result)
        return res.status(200).send({
          message: "User Registration Successfull !",
          token: token,
          data: result,
        });
      } else {
        return res.status(400).send("Your OTP was wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserController;
