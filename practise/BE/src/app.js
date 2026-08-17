const express = require('express');

const app = express();
const notesModel = require('./models/notes.model');
const cors = require('cors');

app.use(cors());

app.use(express.json());


app.post("/api/notes", async(req,res)=>{
     const {title, description} = req.body;

     const notes = await notesModel.create({
          title,description
     })

     res.status(201).json({
          message:"NOTE created",
          notes
     });
})

app.get("/api/notes",async(req,res)=>{
     const notes = await notesModel.find();

     res.status(200).json({
          message:"fetched",
          notes
     })
})

app.delete("/api/notes/:id",async(req,res)=>{
     const id = await req.params.id;

     const notes = await notesModel.findByIdAndDelete(id);
     res.status(200).json({
          message:"Deleted"
     })

});


app.patch("/api/notes/:id",async(req,res)=>{
     const id = req.params.id;

     const {description} = req.body;

     const notes = await notesModel.findByIdAndUpdate(id,{description});
     res.status(200).json({
          message:"Updated",
          
     })
})


module.exports = app;