
const express = require("express");
const app = express();
const notesModel = require("./models/notes.model");
const notesModule = require("./models/notes.model");
const cors = require("cors");

app.use(cors());

app.use(express.json());


app.post("/api/notes",async (req,res)=>{
     const {title, description} = req.body;


     const note  = await notesModel.create({
          title,description
     });

     res.status(201).json({
          message:"NOTE created",
          note
     });
})

app.get("/api/notes",async(req,res)=>{
     const notes =await notesModule.find();

     res.status(200).json({
          message:"fetched",
          notes
     });
})

app.delete("/api/notes/:id",async (req,res)=>{
     const id = req.params.id;
     await notesModel.findByIdAndDelete(id);
     res.status(200).json({
          message:"DEleted"
     });
});


app.patch("/api/notes/:id",async(req,res)=>{
     const id  = req.params.id;
     const{description}= req.body;
     await notesModel.findByIdAndUpdate(id,{description});
     res.status(200).json({
          message:"uPDATED"
     })
})



module.exports = app;