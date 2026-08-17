const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const app = require("./src/app.js");
const connectToDB = require("./src/config/db.js");
connectToDB();


app.listen(3000, ()=>{
     console.log("app is listening on port 3000");
});