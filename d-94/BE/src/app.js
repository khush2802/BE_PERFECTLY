const express = require("express");

const app = express();
app.use(express.json());
const notesModule = require("./models/node.model")
const cors = require("cors");
const path = require("path")
app.use(express.static("./public"))
app.use(cors());


app.post("/api/notes",async (req,res)=>{
     //first destructuing
     const {title,description} = req.body;

     // now will put thew vale in note
     const note = await notesModule.create({
          title,description
     });

     res.status(200).json({
          message:"note created",
          note
     });

});



app.get("/api/notes",async (req,res)=>{
     const notes = await notesModule.find();

     res.status(200).json({
          message:"Fetched",
          notes
     });
});


app.delete("/api/notes/:id", async (req,res)=>{
     const id = req.params.id;
     await notesModule.findByIdAndDelete(id);

     res.status(200).json({
          message:"DELETED"
     });
});


app.patch("/api/notes/:id",async(req,res)=>{
     const id = req.params.id;
     const{description} = req.body;
     await notesModule.findByIdAndUpdate(id,{description});


     res.status(200).json({
          message:"UPDATED"
     });
})




module.exports = app;