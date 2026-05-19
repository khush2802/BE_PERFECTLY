const express = require("express");
const postRouter = express.Router();
const postController = require("../controller/post.controller");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


postRouter.post("/",upload.single("b"), postController.cpostController); 


module.exports = postRouter;