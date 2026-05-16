const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authRoute = express();


authRoute.post("/register",async(req,res)=>{

     //first deconstruct the req.body
     const {email,name,password} = req.body;

     //now we will check user already exist or not
     const isUserExist = await userModel.findOne({email});

     if(isUserExist){
          return res.status(409).json({
               message:"user already exist"
          });
     }

     //now we are going to add the user in db
     const user = await userModel.create({
          name, email,password:crypto.createHash("md5").update(password).digest("hex")
     });

     //token gen part
     const token = jwt.sign({
          id: user._id
     },
     process.env.JWT_KEY
     )

     res.cookie("token",token);

     res.status(201).json({
          message:"User Registered",
          user,
          token
     });

});

authRoute.post("/login", async(req,res)=>{
     const {email,password} = req.body;

     // first will check user existor not
     const userExist = await userModel.findOne({email});
     if(!userExist){
          return res.status(409).json({
               message:"User alresdy exist"
          })
     }

     //const check password i scoreect or not
     const isPW = user.password === password.crypto.createHash("md5").update(password).digest("hex")

     if(!isPW){
           return res.status(409).json({
               message:"User alresdy exist"
          })
     }

     const token = jwt.sign({
          id: user._id
     },
     process.env.JWT_KEY
     )

     res.cookie("token",token);

     res.status(201).json({
          message:"User loggedin",
          
          token
     });
})

//protected route
authRoute.get("/get-me",async(req,res)=>{
     const token = req.cookies.token;
     const decoded = jwt.verify(token, process.env.JWT_KEY);

     const user = await userModel.findById(decoded.id);

     res.json({
          name:user.name,
          email:user.email
     })
})



module.exports = authRoute;