const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// const getController = require("../controllers/post.controller")
const postController = require("../controllers/post.controller");
const tokenDecoderMiddleware = require("../middlewares/auth.middleware");

postRouter.post("/", tokenDecoderMiddleware, upload.single("b"), postController.createPostController);
postRouter.get("/", tokenDecoderMiddleware, postController.getPostController);
postRouter.get("/:postId", tokenDecoderMiddleware, postController.getPostDetailController);
     


module.exports = postRouter;
