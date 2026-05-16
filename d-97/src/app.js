const express = require("express");

const app = express();
const authRoute = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoute);





module.exports = app;