const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
     caption:{
          type:String
     },
     imageURL:{
          type:String,
          require:true

     },
     user:{
          ref:"user",//indication take the user reference from user collection
          type:mongoose.Schema.Types.ObjectId,
          require:true 
     }
});

const postModel = mongoose.model("userPost",postSchema);
module.exports = postModel;