const express = require("express");

const app = express();
app.use(express.json());

const page = [];

app.post("/page",(req,res)=>{
     page.push(req.body);
     res.send("Page added successfully");
})

app.get("/page",(req,res)=>{
     res.send(page);
     // res.send("Page retrieved successfully");
})

app.delete("/page/:index",(req,res)=>{
     delete page[req.params.index];
     res.send("Page deleted successfully");
})

app.patch("/page/:index",(req,res)=>{
     page[req.params.index].Name = req.body.Name;
     res.send("Page updated successfully");
})

module.exports = app;