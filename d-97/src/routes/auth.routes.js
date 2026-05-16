const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authRouter = express.Router();

authRouter.post("/register",async(req,res)=>{

     //first we will desturcture it
     const {email,password,name} = req.body;

     //check user alreadyf exist or not
     const isUserExist = await userModel.findOne({email});

     if(isUserExist){
          return res.status(400).json({
               message:"User Alresdy Exist"
          })
     };



     //user creation
     const user = await  userModel.create({
          email,password,name
     });

     const token = jwt.sign({
     id:user._id,
     email:user.email
},
process.env.JWT_KEY
)

res.cookie("jwt_token", token);

     //response ack
     res.status(201).json({
          message:"User Registered",
          user,
          token
     })




})

module.exports = authRouter;