const express = require("express");

const authRoute  = express.Router();
const{ loginUserController,
     registerUserController,
     getMeController,
     logoutUserController
} = require("../controllers/userAuth.controller.js");

const identifyUserMiddleware = require("../middlewares/userAuth.middleware.js");


authRoute.post("/register",registerUserController);
authRoute.post("/login",loginUserController);
authRoute.get("/get-me", identifyUserMiddleware, getMeController);
authRoute.post("/logout", identifyUserMiddleware, logoutUserController)
module.exports = authRoute;