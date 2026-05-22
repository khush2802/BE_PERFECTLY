const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function userRController(req,res){
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

     const token = jwt.sign({
          id:user._id
     },
     process.env.JWT_KEY
)

res.cookie("token",token);

res.status(201).json({
          message: "User Registered",
          user: {
               username: user.username,
               email: user.email,
               bio: user.bio,
               profileImg: user.profileImg
          }
     });

}


async function loginController(req,res) {

     const { username, password, email } = req.body;

     const userExist = await userModel.findOne({
          $or: [
               { username: username },
               { email: email }
          ]
     });

     if (!userExist) {
          return res.status(400).json({
               message: "User doesn't exist"
          });
     }

     const isPW = await bcrypt.compare(password, userExist.password);

     if (!isPW) {
          return res.status(409).json({
               message: "Wrong Password"
          });
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
     userRController,
     loginController
}

