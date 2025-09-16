const express = require('express')
const authRouter = express.Router()

const { validate } = require('../utils/studentValidator')
const {hashPassword} = require('../utils/hashPassword')
const { verifyPassword } = require('../utils/verifyPassword')
const { getJwt } = require('../utils/getJwt')
const {Student} = require('../models/student')



authRouter.post('/register',async (req,res)=>{
    
    try{

        const data = req.body

        //handing the validation at api level
        validate(data)

        //hashing password
        const hashedPassword = await hashPassword(data.password)
        
        data.password = hashedPassword

        //creating the student 
        await Student.create(data)
        res.send("student registred sucessfully")

    }
    catch(err){
        res.send("error : "+ err.message)
    }
})


authRouter.post('/login',async (req,res)=>{

    try{

        const data = req.body

        //verify the email and password
        const isAllowed = await verifyPassword(data)

        //now give the user a jwt token cookie
        if(isAllowed){
            const temp = await Student.findOne({email : data.email})
            const token = await getJwt(temp) 
            // console.log(token)
            res.cookie("details",token)
        }
        else{
            throw new Error("invalid crediantials")
        }
        
        res.send("login sucessfull")
    }
    catch(err){
        res.send("error : "+ err.message)
    }
})

authRouter.get('/logout',(req,res)=>{
    res.cookie("details",null,{expires : new Date(Date.now())}) //this deletes the token completely
    res.send("logout sucessfull")
})


module.exports = {
    authRouter
}