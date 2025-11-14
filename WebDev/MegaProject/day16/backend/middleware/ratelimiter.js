//ratelimiter so that one user cannot give multiple run or submbit request

const { redisClient } = require("../config/redis");

const ratelimiter = async (req,res,next) => {
  try {
    const userId = `user${res.result._id}`;
    const window_size = 10; //10 seconds

    const max_req = 1;
    const current_time = Date.now()/1000;
    const window_time = current_time - window_size;


    await redisClient.zRemRangeByScore(userId, 0, window_time);
    const no_of_req_made = await redisClient.zCard(userId);


    if (no_of_req_made === max_req) {
      throw new Error("Too many submissions!, try after some time");
    }

    await redisClient.zAdd(userId, [
      { score: current_time, value: `${current_time}:${Math.random()}` },
    ]);

    await redisClient.expire(userId, window_size);
    next();
  } catch (err) {
    res.send("error : " + err.message);
  }
};


module.exports = ratelimiter