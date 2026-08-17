const express = require("express");
const authRoute = require("./routes/userAuth.route");
const cookie = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cookie());
app.use("/api/auth", authRoute);

module.exports = app;