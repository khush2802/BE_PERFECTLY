const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = require("./src/app");
const connectToDB = require("./src/config/db");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors());
dotenv.config();

connectToDB();

app.listen(3000,()=>{
     console.log("Server is running on port 3000");
})