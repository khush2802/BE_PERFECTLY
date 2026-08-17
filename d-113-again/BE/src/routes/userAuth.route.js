const express = require("express");
const authRoute = express.Router();
const { registerUserController, loginUserController } = require("../controllers/userAuth.controller");

authRoute.post("/register", registerUserController);
authRoute.post("/login", loginUserController);


module.exports = authRoute;