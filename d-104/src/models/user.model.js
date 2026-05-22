const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     username:{
          type:String,
          required : true,
          unique: true
     },
     email:{
          type:String,
          required:true,
          unique:true
     },
     password:{
          type:String,
          required:true
     },
     bio:{
          type:String,
          required:true
     },
     profileImg:{
          type:String,
          default:"https://ik.imagekit.io/5budn490g/avatar-default-user-profile-icon-simple-flat-vector-57234190.webp?updatedAt=1771236007279"
     }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;