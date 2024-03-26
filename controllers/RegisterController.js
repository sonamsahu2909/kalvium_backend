const RegisterModel = require("../modals/register");

class RegisterController {

static createRegister = async (req, res) => {
  try {
      console.log(req.body)
    const {
      firstname,
      lastname,
      email,
      grade,
      state,
      totalprice
    } = req.body;
    const order = await RegisterModel.create({
        firstname,
        lastname,
        email,
        grade,
        state,
        totalprice,
      paidAt: Date.now(),
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

// in myorder user can watch its order
static myregister = async (req, res) => {
    try {
      const order = await RegisterModel.find();
      res.status(200).json({ status: "success", order });
    } catch (error) {
      console.log(error);
    }
  };

  // For Admin
  static getallregisters = async (req, res) => {
    try {
      const order = await RegisterModel.find();
      res.status(200).json({ status: "success", order });
    } catch (error) {
      console.log(error);
    }
  };


}

module.exports = RegisterController;

