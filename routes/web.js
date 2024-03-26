const express = require('express')
const route = express.Router()
const checkuserauth = require('../middleware/auth')
const UserController = require('../controllers/UserController')
const EnquireController = require('../controllers/EnquireController')
const FormController = require('../controllers/FormController')
const PaymentController = require('../controllers/PaymentController')
const RegisterController = require('../controllers/RegisterController')

route.post('/signup',UserController.signUp)
route.post('/signupverify',UserController.verifyOtp)


// enquire
route.post('/enquirecreate',EnquireController.EnquireInsert)
route.get('/enquiredisplay',EnquireController.Enquiredisplay)
route.patch('/update_enquire/:id',EnquireController.enquire_update)
route.delete('/enquiredelete/:id',EnquireController.enquiredelete)

// Apply job form
route.post('/apply',FormController.formInsert)
route.get('/apply/form/display',FormController.Formdisplay)
route.patch('/update_apply_form/:id',FormController.formupdate)
route.delete('/apply/delete/:id',FormController.formdelete)

// payment controller
route.post('/payment/process',PaymentController.processPayment)
route.get('/stripeapiKey', PaymentController.sendStripeApiKey)

//Order Controller
route.post('/register/create',RegisterController.createRegister)
route.get('/register/myregister', RegisterController.myregister)
route.get('/register/getallregister', RegisterController.getallregisters)

module.exports = route