const mongoose = require("mongoose");


const notesSchema = new mongoose.Schema({
     title:{
          type:String,
          require:true
     },

     description:{
          type:String,
          require:true
     }
})

const notesModule = mongoose.model("notes",notesSchema);

module.exports = notesModule;