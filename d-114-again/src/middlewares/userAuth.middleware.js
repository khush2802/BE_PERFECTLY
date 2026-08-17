const jwt = require("jsonwebtoken");


const identifyUserMiddleware =(req, res, next)=>{
     const token = req.cookies.token;

     if(!token){
          res.status(404).json({
               message:"unauthorised"
          })
     }

     try{
         
     const decode = jwt.verify(token, process.env.JWT_KEY); 
     req.user = decode;
     next();
     }catch{
           return res.status(401).json({
               message:"Unauthorized"
          })
     }
}

module.exports = identifyUserMiddleware;