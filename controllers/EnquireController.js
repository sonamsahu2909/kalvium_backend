const EnquireModel = require('../modals/enquire')


class EnquireController {
    static EnquireInsert = async (req, res) => {   
        try {
          const data = new EnquireModel({
            fullname: req.body.fullname,
            phone: req.body.phone,
            state: req.body.state,
            grade: req.body.grade,
          });
          await data.save();
          //res.send(req.body)
          res.status(201).json({
            message:"Successfully Send Query !",
            success: true,
            data,
          });
        } catch (error) {
          console.log(error);
        }
      };
      
    
      static Enquiredisplay = async (req, res) => {
        const data = await EnquireModel.find();
        res.status(200).json({
          success: true,
          data,
        });
      };

      static enquiredelete = async (req, res) => {
        const result = await EnquireModel.findById(req.params.id);
       
        try {
          if(result){
            const enquire = await EnquireModel.findByIdAndDelete(req.params.id);
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
    
      static enquire_update = async (req, res) => {
        
        try {
          // console.log(req.files.image)
    
          const enquire = await EnquireModel.findById(req.params.id);
            
          var enquiredata = {
              fullname: req.body.fullname,
              phone: req.body.phone,
              state: req.body.state,
              grade: req.body.grade,
          }
        //   console.log(enquiredata)
          const update_enquire = await EnquireModel.findByIdAndUpdate(
            req.params.id,
            enquiredata
          );
          await update_enquire.save();
          res
            .status(201)
            .json({ status: "Success", message: "slider Update successfully" });
        } catch (error) {
          console.log(error);
        }
      };
}

module.exports = EnquireController;