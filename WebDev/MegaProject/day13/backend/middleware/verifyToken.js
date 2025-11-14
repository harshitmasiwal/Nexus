const jwt = require('jsonwebtoken')
const { redisClient } = require('../config/redis')
const User = require('../model/user')


const verifyToken = async (req,res,next) => {


    try{

        if(!req.cookies.token){
            throw new Error("login first (no token is provided)")
        }
        
        const token = req.cookies.token
        const payload = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(payload._id)
        
        //check the token is expired in redis
        const isBlocked = await redisClient.exists(`token:${token}`)
        if(isBlocked){
            throw new Error("token is expired (re-login)")
        }
        
        res.result = user
        next()

    }
    catch(err){
        console.log("hello")
        res.status(401).send("error : " + err.message)
    }

    

}

module.exports = verifyToken