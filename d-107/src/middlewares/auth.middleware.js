const jwt = require("jsonwebtoken");

async function tokenDecoderMiddleware(req,res,next){
      const token = req.cookies.token;
     if(!token){
          return res.status(401).json({
               message:"Unauthorized"
          })
     }

     let decoded = null;
     try{
          decoded = jwt.verify(token, process.env.JWT_KEY)

     }catch(error){
          return res.status(401).json({
               message:"Unauthorized"
          })
     }
     req.user = decoded;
     next();
}

module.exports = tokenDecoderMiddleware;
