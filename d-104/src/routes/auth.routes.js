
const express = require("express");
const authRoute = express.Router();
const { userRController, loginController } = require("../controllers/auth.controller");


authRoute.post("/register",userRController);
authRoute.post("/login",loginController);

module.exports = authRoute;
