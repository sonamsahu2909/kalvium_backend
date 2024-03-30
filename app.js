const express = require('express')
const app = express()
<<<<<<< HEAD
const port = 3692
=======
const port = 5000
>>>>>>> cb217422414bccd5985195714ba5c4fbc80948f2
const web = require('./routes/web')
const dotenv = require('dotenv')
const connectdb = require('./db/dbcon')
const cors = require('cors')
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')

<<<<<<< HEAD
=======
// const corsOptions = {
//   origin: 'http://localhost:3000'
// };
>>>>>>> cb217422414bccd5985195714ba5c4fbc80948f2

app.use(cors())
app.use(express.json())
app.use(fileUpload({useTempFiles: true}));
app.use(cookieParser())
app.use(bodyparser.json());  // bodyparser it is only use for subcategory 
app.use(bodyparser.urlencoded({extended:true}))

dotenv.config({path:".env"})
connectdb()

app.use('/',web)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })