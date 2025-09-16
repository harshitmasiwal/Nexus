// const { redisClient } = require("../database/redis")


// const rateLimiter = async(req,res,next)=>{

//     try{
//         const ip = String(req.ip)
//         // console.log(ip) //this will give the ip address from where the response is made 

//         const count = await redisClient.incr(ip) //incr function automatically do the count stuff for us otherwise we have to use the set and all or make our coustum function and it returns the count of the ip

//         // console.log(count)


//         //only allowing 10 requests to the user 
//         if(count > 10){
//             throw new Error("Too many requests!, try after sometime")
//         }

//         //if user hit req first time also add the expire time of his ip address like 60 seconds
//         if(count == 1 ){
//             await redisClient.expire(ip,60) //this will set the fixed window like 60 seconds 
//         }

//         //so this is code of fixed window which will allow user to hit 10 requests in 60 seconds

//         next()
//     }
//     catch(err){
//         res.send("error : "+err.message)
//     }

// }

// module.exports = {
//     rateLimiter
// }
