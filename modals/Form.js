const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    resume: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    marital_status: {
      type: String,
      required: true,
    },
    // Store multiple images
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    // Additional file types
    // document: {
    //   data: Buffer,
    //   contentType: String,
    // },
    // video: {
    //   data: Buffer,
    //   contentType: String,
    // },
    // audio: {
    //   data: Buffer,
    //   contentType: String,
    // },
  },
  { timestamps: true }
);

const formModel = mongoose.model("form", formSchema);
module.exports = formModel;
