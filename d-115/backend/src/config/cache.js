const Redis = require("ioredis").default;

const redis = new Redis({
     port: process.env.REDIS_PORT,
     host: process.env.REDIS_HOST,
     password: process.env.REDIS_PASSWORD
})


//down gere its a type of eventlistner

redis.on("connect",()=>{
     console.log("Redis connected");
});

redis.on("error",(err)=>{
     console.log("Redis error", err);
});


module.exports = redis;