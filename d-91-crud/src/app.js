const express = require("express");
const notesModel = require("./models/notes.model");
const app = express();

app.use(express.json());

app.post("/notes",async (req,res)=>{
     const {title,body,age} = req.body;

     const note = await notesModel.create({
          title,body,age
     });

     res.status(201).json({
          message:"notes created",
          note
     });
});

app.get("/notes",async(req,res)=>{
     const notes = await notesModel.find();

     res.status(200).json({
          message:"successfully fetcjhed",
          notes
     })
})







module.exports = app;