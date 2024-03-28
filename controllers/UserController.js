const bcrypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require("otp-generator");
const dotenv = require("dotenv").config()
const twilio = require("twilio")
// Define OTP expiry duration in milliseconds (e.g., 5 minutes)
const OTP_EXPIRY_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = '+18142508747'

const twilioClient = require('twilio')(accountSid,authToken)

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
      console.log(OTP)

      // await twilioClient.messages.create({
      //   from: fromNumber, 
      //   body: `Your OTP is : ${OTP}`,
      //   to:'+91' + number,     
      // }).then(message => console.log(message.sid))

      const otp = new OtpModal ({number:number , otp: OTP})
      console.log(otp)
      const salt = await bcrypt.genSalt(10)
      otp.otp = await bcrypt.hash(otp.otp, salt)
      const result = await otp.save();
      // console.log(result)
      return res.status(200).json({
        success:true,
        msg:'Otp send successfully'

      })
    } catch (error) {
      console.log(error);
    }
  };

  static verifyOtp = async (req, res) => {
    try {
        const otpHolder = await OtpModal.find({
            number: req.body.number,
            otp:req.body.otp
        })
        console.log(otpHolder.length)
        if (otpHolder.length === 0) return res.status(400).send("you are expired otp!")
        const rightOtpFind = otpHolder[otpHolder.length -1];
        // const isExpired = rightOtpFind.createdAt.getTime() + OTP_EXPIRY_DURATION < Date.now();
        // if (isExpired) {
        //     return res.status(400).send("The OTP has expired. Please request a new one.");
        // }
        console.log('User OTP:', req.body.otp);
        console.log('Hashed OTP:', rightOtpFind.otp);
        
        const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
        
        // const validUser = await bcrypt.compare(req.body.otp ,rightOtpFind.otp)
        console.log(validUser)
        if(rightOtpFind.number === req.body.number && validUser){
            const user = new UserModal(_.pick(req.body, ["number"]))
            const token = user.generateJWT();
            const result  = await user.save()
            console.log(result)
            const OPTDelete = await OtpModal.deleteMany({
                number :rightOtpFind.number
            })
            return res.status(200).send({
                message:"User Registration Successfull !",
                token: token,
                data :result
            })
        }  else {
            return res.status(400).send("Your OTP was wrong!")
        }
    } catch (error) {
      console.log(error);
    }
  };

//   static verifyOtp = async (req, res) => {
//     try {
//         const otpHolder = await OtpModal.find({
//             number: req.body.number,
//             otp: req.body.otp
//         });
// // console.log(otpHolder.length)
//         if (otpHolder.length === 0) {
//             return res.status(400).send("You have no pending OTP requests.");
//         }

//         const rightOtpFind = otpHolder[otpHolder.length - 1];
//         const isExpired = rightOtpFind.createdAt.getTime() + OTP_EXPIRY_DURATION < Date.now();

//         if (isExpired) {
//             return res.status(400).send("The OTP has expired. Please request a new one.");
//         }

//         console.log('User OTP:', req.body.otp);
//         console.log('Hashed OTP:', rightOtpFind.otp);
        
//         const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
        
//         if (validUser) {
//             const user = new UserModal(_.pick(req.body, ["number"]));
//             const token = user.generateJWT();
//             const result = await user.save();

//             const OPTDelete = await OtpModal.deleteMany({
//                 number: req.body.number
//             });
// console.log(result)
//             return res.status(200).send({
//                 message: "User Registration Successful!",
//                 token: token,
//                 data: result
//             });
//         } else {
//             return res.status(400).send("Your OTP was wrong!");
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send("Internal Server Error");
//     }
// };

static createorder = async (req, res) => {
  try {
      console.log(req.body)
    const {
      firstname,
      lastname,
      email,
      grade,
      state,
    } = req.body;
    const order = await OrderModel.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res
      .status(201)
      .json({
        status: "success",
        message: "Order added Successfully 😃🍻",
        order,
      });
  } catch (error) {
    console.log(error);
  }
};


}

module.exports = UserController;

