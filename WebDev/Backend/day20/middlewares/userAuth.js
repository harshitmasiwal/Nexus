const jwt = require('jsonwebtoken')
const {Citizens} = require('../models/citizen')
 
const userAuth = (req,res,next)=>{

    const token = req.cookies?.genratedToken

    if(!token){
        res.send("token is empty")
    }

    try{
    const payload = jwt.verify(token,"secret_key")
    req.result = payload
    next()
    }
    catch(err){
        throw new Error("invalid or expired token : "+err.message)
        
    }
    // console.log(req.result) can store this to send the payload 
    
}


module.exports = {
    userAuth
}