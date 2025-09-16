const redis = require('redis')

const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-11940.c52.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 11940
    }
})


const connectRedis = async ()=>{
    await redisClient.connect()
}   

module.exports = {
    redisClient,
    connectRedis
}