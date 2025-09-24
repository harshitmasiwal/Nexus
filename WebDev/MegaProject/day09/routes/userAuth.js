const express = require('express')
const authRouter = express.Router()
const {register , login , logout , adminRegister, deleteUser} = require('../controllers/userAuthenticate')
const verifyToken = require('../middleware/verifyToken')
const verifyAdminToken = require('../middleware/verifyAdminToken')

//register 
authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout',verifyToken,logout)


//for registering new admin 
authRouter.post('/admin/register',verifyAdminToken,adminRegister)

//for deleting the user 
authRouter.delete('/delete',verifyToken,deleteUser)

//login
//logout
//getprofile

module.exports = authRouter