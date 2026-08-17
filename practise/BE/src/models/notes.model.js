const mongoose  = require("mongoose");

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

const notesModel = mongoose.model("notes",notesSchema);

module.exports = notesModel;