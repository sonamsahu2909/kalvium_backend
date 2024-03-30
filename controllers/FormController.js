const formModel = require('../modals/Form');
const dotenv = require('dotenv').config()
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

class FormController {
  static formInsert = async (req, res) => {
    try {
        const file = req.files.image;
        const files = req.files.resume;
        console.log(file, files);

        const image_upload = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "form",
            width: 400,
        });
        const resume = await cloudinary.uploader.upload(files.tempFilePath, {
            folder: "resume",
            // width: 400,
        });

        const data = new formModel({
            resume: {
                public_id: resume.public_id,
                url: resume.secure_url,
            },
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            location: req.body.location,
            address: req.body.address,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            dob: req.body.dob,
            gender: req.body.gender,
            marital_status: req.body.marital_status,
            image: {
                public_id: image_upload.public_id,
                url: image_upload.secure_url,
            },
        });

        await data.save();

        res.status(201).json({
            message: "Successfully Registered!",
            success: true,
            data,
        });
    } catch (error) {
      console.error('Error occurred during form insertion:', error);
      // Log file details only if file variable is defined
      if (file) {
          console.error('File Details:', file);
      }
      res.status(500).json({
          message: "Failed to process the form",
          success: false,
          error: error.message
      });
    }
};

    
      static Formdisplay = async (req, res) => {
        const data = await formModel.find();
        res.status(200).json({
          success: true,
          data,
        });
      };

      static formdelete = async (req, res) => {
        const result = await formModel.findById(req.params.id);
        // const imgdata = result.images;
        // const resumedata = result.resume
         //console.log(imgdata)
        // await cloudinary.uploader.destroy(imgdata,resumedata);
        try {
          if(result){
            const form = await formModel.findByIdAndDelete(req.params.id);
          res.status(200).json({
            success: true,
            message: "Delete Successfully",
          });
          } else {
            res.status(200).json(`data is not found`)
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    static formupdate = async (req, res) => {
        // console.log(req.params.id)
        try {
          // console.log(req.files.image)
    
          if (req.files) {
            const user = await SliderModel.findById(req.params.id);
            const image_id = user.image;
            // console.log(image_id)
            await cloudinary.uploader.destroy(image_id);
    
            const file = req.files.image;
            const image_upload = await cloudinary.uploader.upload(
              file.tempFilePath,
              {
                folder: "slider",
                width: 400,
              }
            );
            var data = {
              title: req.body.title,
              description: req.body.description,
              image: {
                public_id: image_upload.public_id,
                url: image_upload.secure_url,
              },
            };
          } else {
            var data = {
              title: req.body.title,
              description: req.body.description,
            };
          }
          const update_slider = await SliderModel.findByIdAndUpdate(
            req.params.id,
            data
          );
          await update_slider.save();
          res
            .status(201)
            .json({ status: "Success", message: "slider Update successfully" });
        } catch (error) {
          console.log(error);
        }
      };
}

module.exports = FormController;