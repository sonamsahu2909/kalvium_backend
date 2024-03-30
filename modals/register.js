const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 999,
    },
    registerStatus: {
      type: String,
      required: true,
      default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const RegisterModel = mongoose.model("register", registerSchema);
module.exports = RegisterModel;
