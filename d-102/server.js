
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");


connectToDB();



app.listen(3000,(req,res)=>{
     console.log("Posrt listening on 3000");
});