const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");


async function uRegisterController(req,res){
     const {username, profileImg, email, bio, password} = req.body;

     const isUserExist = await userModel.findOne({
          $or:[
               {username}, {email}
          ]
     })

     if(isUserExist){
          return res.status(409).json({
               message:"user already exist"
          })
     }

     const hashedPassword = await bcrypt.hash(password, 10);

     const user = await userModel.create({
          username,
          profileImg,
          email,
          bio,
          password: hashedPassword
     })

     const yoken = jwt.sign({
          id:user._id
     },
     process.env.JWT_KEY
)              
res.cookie("token",yoken);

res.status(201).json({
          message: "User Registered",
          user: {
               username: user.username,
               email: user.email,
               bio: user.bio,
               profileImg: user.profileImg
          }
     })

}


async function uLoginController(req,res){
     const {email, username, password} = req.body;

     const userExist = await userModel.findOne({
          $or:[
               {username}, {email}
          ]
     })
     if(!userExist){
          return res.status(404).json({
               message:"user not found"
          })
     }

     const isPasswordMatch = await bcrypt.compare(password, userExist.password);

     if(!isPasswordMatch){
          return res.status(400).json({
               message:"invalid credentials"
          })
     }

      const token = jwt.sign(
               {
                    id: userExist._id
               },
               process.env.JWT_KEY
          );
     
          res.cookie("token", token);
     
          res.status(200).json({
               message: "User logged in",
               token
          });
}


module.exports = {
     uRegisterController,
     uLoginController
}