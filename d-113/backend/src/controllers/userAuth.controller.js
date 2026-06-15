const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




const registerUserController = async (req, res)=>{
     const {username,
          email,
          password} = req.body;
     

          const userExists = await userModel.findOne({
               $or:[
                    {username}, {email}
               ]
          })

          if(userExists){
               return res.status(409).json({
                    message:"user already exist"
               })
          }


          const hashedPassword = await bcrypt.hash(password, 10);


          const user = await userModel.create({
               username,
               email,
               password: hashedPassword
          })

          const token  = jwt.sign({
               id:user._id,
               username:user.username
          },
          process.env.JWT_KEY,{
               expiresIn:"1d"
          });
          
          res.cookie("token",token)
          
const userResponse = {
    id: user._id,
    username: user.username,
    email: user.email
};

res.status(201).json({
    message: "User Registered",
    user: userResponse,
    token
});
}


const loginUserController = async (req,res)=>{
     const {email, password, username} = req.body;

     const userExist = await userModel.findOne({
          $or:[
               {email:email},
               {username:username}
          ]
     })

     if(!userExist){
          return res.status(404).json({
               message:"invalid credentials"
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
                    id: userExist._id,
                    username:userExist.username   
               },
               process.env.JWT_KEY,{
                    expiresIn:"1d"
               }
          );
          res.cookie("token", token);


          res.status(200).json({
               message:"Login successful",
               token
          })
}


module.exports = {registerUserController, loginUserController}