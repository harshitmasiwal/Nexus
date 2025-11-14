const jwt = require('jsonwebtoken')
const { redisClient } = require('../config/redis')


const verifyAdminToken = async (req,res,next) => {


    try{
        
        if(!req.cookies.token){
            throw new Error("login first (no token is provided)")
        }
        
        const token = req.cookies.token
        const payload = jwt.verify(token,process.env.JWT_SECRET)

        //checking if the role is admin of the user
        if(payload.role != 'admin'){
            throw new Error("login as admin!")
        }
        
        //check the token is expired in redis
        const isBlocked = await redisClient.exists(`token:${token}`)
        if(isBlocked){
            throw new Error("token is expired (re-login)")
        }
        
        res.result = payload
        next()

    }
    catch(err){
        res.send("error : " + err.message)
    }

    

}

module.exports = verifyAdminToken