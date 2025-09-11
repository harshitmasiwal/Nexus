const jwt = require('jsonwebtoken')

const userAuth = (req,res,next)=>{

    try{
        // console.log(req.cookies)
        if(!req.cookies.details){
            throw new Error("no token is provided")
        }

        const details = jwt.verify(req.cookies.details,process.env.SERVER_KEY)
        // console.log(details)

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