const blacklistingModel = require("../models/blackListedToken.model");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");



const registerUserController = async(req, res)=>{
     const {username, email, password} = req.body;

     const userExist = await userModel.findOne({
          $or:[
               {username}, {email}
          ]
     });

     if(userExist){
          return res.status(409).json({
               message:"user already exist"
          })
     }

     const hashPw = await bcrypt.hash(password, 10);

     const user = await userModel.create({
          username,
          email,
          password:hashPw
     });


     res.cookie("token", token);

     res.status(201).json({
          message:"user registered",
          token,
          user:{
               id:user._id,
               username:user.username,
               email:user.email

          }
     });

}


const loginUserController = async(req, res)=>{
     const {email, username, password} = req.body;

     const userExist = await userModel.findOne({
          $or:[
               {username},{email}
          ]
     })


     if(!userExist){
          return res.status(404).json({
               message:"user not exist"
          })
     }

     const isPw = await bcrypt.compare(password, userExist.password);

     if(!isPw){
          return res.status(404).json({
               message:"wrong password"
          })
     }

     const token = jwt.sign({
          id:userExist._id,
          name:userExist.username
     },process.env.JWT_KEY,{
          expiresIn:"1d"
     });

     res.cookie("token",token);


     res.status(201).json({
          message:"logged in",
          token,
          user:{
               id:userExist._id,
               username:userExist.username,
               email:userExist.email
          }
     })


}


const getMeController = async(req,res)=>{
     const user = await userModel.findById(
          req.user.id
     ).select("+password");

     res.status(200).json({
          message:"user fetched",
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

     await blacklistingModel.create({
          token
     })

     res.status(201).json({
          message:"token blacklisted"
     });



}
module.exports = {
     loginUserController,
     registerUserController,
     getMeController,
     logoutUserController
}