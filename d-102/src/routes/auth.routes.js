const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/user.controller");


authRouter.post("/register", authController.registerController);
authRouter.post("/login", authController.loginController);




module.exports = authRouter;