const express = require('express');
const authRoute = express.Router();
const {uRegisterController, uLoginController} = require("../controllers/auth.controller");

authRoute.post("/register",uRegisterController);
authRoute.post("/login", uLoginController);

module.exports = authRoute;