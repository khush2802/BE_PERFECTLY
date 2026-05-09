const express = require("express");

const app = express();
app.use(express.json());

let login = [];



app.post("/login",(req,res)=>{
     res.send("post successfull");
     console.log(req.body);
     login.push(req.body);

})
app.get("/login",(req,res)=>{
     res.send(login);
})

app.listen(3000,()=>{
     console.log("port listeinng on 3000")
});