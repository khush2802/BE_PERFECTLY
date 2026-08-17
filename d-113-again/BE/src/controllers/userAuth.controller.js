const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUserController = async(req,res)=>{
     const{username, email, password} = req.body;

     const userExist = await userModel.findOne({
          $or:[
               {username}, {email}
          ]
     }) 

     if(userExist){
          return res.status(409).json({
               message:"user already exist"
          })
     }

     const hashedPw = await bcrypt.hash(password, 10);

     const user = await userModel.create({
          username,
          email,
          password:hashedPw
     })

     const token = jwt.sign({
          id:user._id,
          username:user.username
     },
     process.env.JWT_Key,{
          expiresIn:"1d" 
     })
     res.cookie("token", token);


     res.status(201).json({
          token,
          user:{
               id:user._id,
               username:user.username,
               email:user.email
          }
     })
}


const loginUserController = async(req, res)=>{
     const {email, username, password} = req.body;

     const userExist = await userModel.findOne({
          $or:[
               {email}, {username}
          ]

     })

     if(!userExist){
          return res.status(404).json({
               message:"user not found"
          })
     }


     const isPw = await bcrypt.compare(password, userExist.password);


     if(!isPw){
          return res.status(400).json({
               message:"invalid password"
          })
     }

     const token = jwt.sign({
          id:userExist._id,
          username:userExist.username
     },
     process.env.JWT_Key,{
          expiresIn:"1d" 
     });

     res.cookie("token", token);

     res.status(200).json({
          token,
          user:{
               id:userExist._id,
               username:userExist.username,
               email:userExist.email
          }
     })


}

module.exports = {
     registerUserController,
     loginUserController
}