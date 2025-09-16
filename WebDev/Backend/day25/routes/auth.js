const express = require('express')
const authRouter = express.Router()

const { validate } = require('../utils/studentValidator')
const {hashPassword} = require('../utils/hashPassword')
const { verifyPassword } = require('../utils/verifyPassword')
const { getJwt } = require('../utils/getJwt')
const {Student} = require('../models/student')
const { userAuth } = require('../middlewares/userAuth')
const {redisClient} = require('../database/redis')
const jwt = require('jsonwebtoken')
const { rateLimiter } = require('../middlewares/rateLimiter')
const { slidingRateLimiter } = require('../middlewares/slidingRateLimiter')


authRouter.post('/register',slidingRateLimiter,async (req,res)=>{
    
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


authRouter.post('/login',slidingRateLimiter,async (req,res)=>{

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

authRouter.get('/logout',slidingRateLimiter,userAuth,async (req,res)=>{

    //first we authenticated user by *userAuth* middleware that the user is valid or not
    
    //now we will place the current token of the user in blocked list of our redisDB
    const token = req.cookies.details
    // console.log(token)

    const payload = jwt.decode(token)
    // console.log(payload) 
    //{
    //   email: 'dhruvc@gmail.com',
    //   phone: '7827902652',
    //   iat: 1757758422,
    //   exp: 1757758602              
    // the exp will tell us when the token is expiring and it is seconds from 1 jan 1970 so we will pass this to redis to delete after this seconds from 1970 jan 1
    // }

    //the redis stores the data in key : value pair so we will store the token(const {details} = req.cookies) as the key and value will be "invalid" or anything cause we only want to check wheter the token is present as index in out db

    await redisClient.set(`token:${token}`,"invalid")
    // await redisClient.expire(`token:${token}`,180) //seconds after which this key will be deleted
    await redisClient.expireAt(`token:${token}`,payload.exp+10) //adding 10 more seconds just to make the jwt expire completely

    res.cookie("details",null,{expires : new Date(Date.now())}) //this deletes the token completely
    res.send("logout sucessfull")
})


module.exports = {
    authRouter
}