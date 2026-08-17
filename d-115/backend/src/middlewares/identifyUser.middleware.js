const jwt = require("jsonwebtoken");
const blacklistingModel = require("../models/blacklisting.model");
const redis = require("../config/cache");

const identifyUserMiddleware = async(req,res,next)=>{

     const token = req.cookies.token;

     if(!token){
          return res.status(401).json({
               message:"Unauthorized"
          })
     }

     const isTokenblacklisted = await redis.get(token);

     if(isTokenblacklisted){  
          return res.status(401).json({
               message:"Unauthorized invalid token"
          })
     }



     try{
          const decode = jwt.verify(token, process.env.JWT_KEY);

          req.user = decode;
          next();
     }catch(err){
          return res.status(401).json({
               message:"Unauthorized"
          })
     }
}


module.exports = identifyUserMiddleware;