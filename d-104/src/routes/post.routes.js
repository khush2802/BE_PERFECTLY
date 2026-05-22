const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// const getController = require("../controllers/post.controller")
const postController = require("../controllers/post.controller");

postRouter.post("/",upload.single("b"), postController.cpostController);
postRouter.get("/",postController.getPostController);
postRouter.get("/detail/:postId", postController.getPostDetail);

module.exports = postRouter;