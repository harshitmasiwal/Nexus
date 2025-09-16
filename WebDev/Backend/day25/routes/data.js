const express = require('express')
const dataRouter = express.Router()
const { userAuth } = require('../middlewares/userAuth')
const {Student} = require('../models/student')
const { rateLimiter } = require('../middlewares/rateLimiter')
const { slidingRateLimiter } = require('../middlewares/slidingRateLimiter')


//post the student data
dataRouter.post('/post',slidingRateLimiter,userAuth,async (req,res)=>{   

    try{

        const data = req.body
        // console.log(res.result)

        const student = await Student.findOne({email: res.result.email})
        student.studentData = data.data
        await student.save()

        res.send("student data uploaded sucessfully")

    }
    catch(err){
        res.send("error : "+ err.message)
    }


})


//get the student data
dataRouter.get('/get',slidingRateLimiter,userAuth,async(req,res)=>{

    try{

        const student = await Student.findOne({email : res.result.email})
        const data = await student.getData()
        res.send(data)

    }
    catch(err){
        res.send("error : "+ err.message)
    }
})

module.exports = {
    dataRouter
}