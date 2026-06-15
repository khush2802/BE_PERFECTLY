
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");


const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRI_KEY, // This is the default and can be omitted
});

async function createPostController(req,res){

     const userId = req.user.id;

     const file = await client.files.upload({
       file: await toFile(Buffer.from(req.file.buffer), 'file'),
       fileName: 'b',
       folder:"PERFECTLY"
     });
     
         const post = await postModel.create({
           caption : req.body.caption,
           imageURL:file.url,
           user:userId
         })
     
         res.status(201).json({
           message : "Post craeted succesfully",
           post
         })
     
}


async function getPostController(req, res){

     const userId = req.user.id;
     const post = await postModel.find({
          user:userId
     })

     res.status(200).json({
          message:"the post requested",
          post
     })
}


async function getPostDetailController(req,res){
    


     const userId = req.user.id;
     const postId = req.params.postId;


     const post = await postModel.findById(postId);
     if(!post){
          return res.status(404).json({
               message:"No post"
          })
     }

     const isOwner = post.user.toString() === userId;
     if(!isOwner){
          return res.status(403).json({
               message:"Forbidden"
          })
     }

     res.status(200).json({
          message:"Post details",
          post
     })
}


module.exports = {createPostController, getPostController, getPostDetailController};
