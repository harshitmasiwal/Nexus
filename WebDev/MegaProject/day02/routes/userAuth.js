const express = require('express')
const authRouter = express.Router()
const {register , login , page , logout} = require('../controllers/userAuthenticate')
const verifyToken = require('../middleware/verifyToken')

//register 
authRouter.post('/register',register)
authRouter.post('/login',verifyToken,login)
authRouter.post('/logout',verifyToken,logout)
authRouter.get('/getProfile',verifyToken,page)

//login
//logout
//getprofile

module.exports = authRouter