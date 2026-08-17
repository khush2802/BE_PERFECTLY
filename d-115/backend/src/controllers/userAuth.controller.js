const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const redis = require("../config/cache");
const blacklistingModel = require("../models/blacklisting.model")


const registerUserController = async(req,res)=>{
     const {
          username,
          email,
          password
     } = req.body;


     const isUserExist = await userModel.findOne({
          $or:[
               {email},
               {username}
          ]
     });
     if(isUserExist){
          return res.status(400).json({
               message:"User already exist"
          })
     }

      const hashedPassword = await bcrypt.hash(password,10);


      const newUser = await userModel.create({
               username,
               email,
               password:hashedPassword  

      });


      const token = jwt.sign({id:newUser._id},process.env.JWT_KEY,{expiresIn:"1d"});
      res.cookie("token", token);


      res.status(201).json({
          message:"User Registered",
          user:{
               id:newUser._id,
               username:newUser.username,
               email:newUser.email
          },
          token
      })
}


const loginUserController =  async(req,res)=>{
     const {
          email,
          password,
          username
     } = req.body;


     const isUserExist = await userModel.findOne({
          $or:[
               {email:email},
               {username:username}
          ]
     }).select("+password");

     if(!isUserExist){
          return res.status(404).json({
               message:"User not found"
          })
     }

     const isPasswordMatch = await bcrypt.compare(password,isUserExist.password);

     if(!isPasswordMatch){
          return res.status(400).json({
               message:"Invalid credentials"
          })
     }


     const token = jwt.sign({
          id:isUserExist._id,
          username:isUserExist.username
     },
     process.env.JWT_KEY,{
          expiresIn:"1d"
     })

     res.cookie("token",token);

     res.status(200).json({
          message:"User logged in",
          user:{
               id:isUserExist._id,
               username:isUserExist.username,
               email:isUserExist.email
          },
          token
     })
}


const getMeController = async(req,res)=>{
     const user = await userModel.findById(req.user.id).select("+password");

     res.status(200).json({
          message:"User fetched",
          user:{
               id:user._id,
               username:user.username,
               email:user.email
          }
     })



}

const logoutUserController = async(req,res)=>{
    const token = req.cookies.token;
     res.clearCookie("token");
     
     // await blacklistingModel.create({
     //      token
     // })

     await redis.set(token,Date.now().toString());

     res.status(200).json({
          message:"User logged out"
     });

}


module.exports = {
     registerUserController,
     loginUserController,
     getMeController,
     logoutUserController
}

