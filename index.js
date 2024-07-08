require('dotenv').config()
const express = require('express')
const app = express()
const dbConnetion = require('./helper/dbConnection')
const secureApi = require('./middleware/secureApiMiddleware')
const registrationController = require('./controller/registrationController')
const loginController = require('./controller/loginController')
const emailVerifycationController = require('./controller/emailVerifycationController')
const blogPostController = require('./controller/blogPostController')
const getAllBlogController = require('./controller/getAllBlogController')
const multer  = require('multer')
const path = require('path')
dbConnetion()
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
const port = process.env.PORT || 8000;



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/registration', secureApi, registrationController)
app.post('/login', secureApi, loginController)
app.post('/blogpost', secureApi, upload.single('avatar'), blogPostController)
app.get('/blogpost', secureApi, getAllBlogController)
app.get('/:email', emailVerifycationController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})