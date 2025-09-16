const { redisClient } = require("../database/redis")

const slidingRateLimiter = async(req,res,next)=>{

    try{
        const ip = String(req.ip) //this will be act as the key
        const window_size = 60 //in seconds
        const max_req = 10 //only 10 request allowed in past 60 seconds
        const current_time = Date.now()/1000  //in seconds
        const window_time = current_time-window_size

        //now we will use the sorted set of the redisclient 
        
        await redisClient.zRemRangeByScore(ip , 0 , window_time ) //the range is set to 0 to last 60 seconds (window_time )
        
        const no_of_requests_made = await redisClient.zCard(ip)

        if(no_of_requests_made > max_req){
            throw new Error("Too many requests!, try after some time")
        }

        await redisClient.zAdd(ip , [ {score : current_time , value : `${current_time}:${Math.random()}`} ])
        //the value should be unique so it can get inserted into the set if its same then it will not be able to insert into the set so it should be unique for every time 
        //currently we are using math.random but we know its not random because it is calculated using the system clock so we will use crypto library for getting real random number 
        

        //now set the expiry time of the key which is inserted into the set 
        await redisClient.expire(ip,window_size) //expires after 60 seconds from current time

        next()
    }
    catch(err){
        res.send("error : "+ err.message)
    }

}

module.exports = {
    slidingRateLimiter
}