const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     name:{
          type:String,
          require:true
     },

     email:{
          type:String,
          require:true,
          unique:[true,"EmailAlready exist"]
     },

     password:{
          type:String,
          require:true
     }
});

const userModel = mongoose.model("USER",userSchema);

module.exports = userModel;