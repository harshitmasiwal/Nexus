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

//ping user auth
authRouter.get('/check',verifyToken,(req,res)=>{
    console.log("hello")
    const reply = {
        firstName : res.result.firstName,
        emailID : res.result.emailID,
        _id : res.result._id,
        role:res.result.role
    }

    res.status(200).json({
        user : reply,
        message : "valid user"
    })
})

module.exports = authRouter