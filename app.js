const express = require('express')
const app = express()
const port = 3692

const web = require('./routes/web')
const dotenv = require('dotenv')
const connectdb = require('./db/dbcon')
const cors = require('cors')
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')


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