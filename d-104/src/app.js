const express = require("express");
const authRoute = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoute);
app.use("/api/post",postRouter);

module.exports = app;