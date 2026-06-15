const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const connectToDB = require("./src/config/db");
connectToDB();


const app = require("./src/app");

app.listen(3000,()=>{
     console.log("listening on 3000");
})