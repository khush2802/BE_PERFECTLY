const mongoose = require("mongoose");

const blackListingSchema = new mongoose.Schema({
     token:{
          type:String,
          req:[true, "token is req"],
     }
},{
          timestamps:true
     }
);

const blacklistingModel = mongoose.model("blackListing", blackListingSchema);

module.exports = blacklistingModel;