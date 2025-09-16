const jwt = require('jsonwebtoken')
const { redisClient } = require('../database/redis')

const userAuth = async (req,res,next)=>{

    try{
        // console.log(req.cookies)
        if(!req.cookies.details){
            throw new Error("no token is provided")
        }

        const token = req.cookies.details
        const details = jwt.verify(token,process.env.SERVER_KEY)
        // console.log(details)

        //checking that the user token is in block list in redisDB 
        //if yes then user cant acess the routes 
        const isBlocked = await redisClient.exists(`token:${token}`)
        if(isBlocked){
            throw new Error("blocked token")
        }

        res.result = details

        

    next()
    }
    catch(err){
        res.send("error : "+ err.message)
    }
   

}

module.exports = {
    userAuth
}