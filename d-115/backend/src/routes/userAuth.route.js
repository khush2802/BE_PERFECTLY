
const express = require("express");
const authRoute = express.Router();

const {registerUserController, loginUserController, getMeController, logoutUserController} = require("../controllers/userAuth.controller");
const identifyUserMiddleware = require("../middlewares/identifyUser.middleware");

authRoute.post("/register", registerUserController);
authRoute.post("/login", loginUserController);
authRoute.get("/get-me", identifyUserMiddleware, getMeController);
authRoute.post("/logout", identifyUserMiddleware, logoutUserController);
module.exports = authRoute;