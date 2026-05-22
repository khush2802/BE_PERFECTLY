const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model")
const userModel = require("../models/user.model");


const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRI_KEY, // This is the default and can be omitted
});


async function cpostController(req, res) {


    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }


     const file = await client.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'b',
  folder:"PERFECTLY"
});

    const post = await postModel.create({
      caption : req.body.caption,
      imageURL:file.url,
      user:decoded.id
    })

    res.status(201).json({
      message : "Post craeted succesfully",
      post
    })

}

async function getPostController(req,res){
  const token = req.cookies.token

  let decoded = null;

  try{
    decoded = jwt.verify(token, process.env.JWT_KEY);
  }catch(error){
    return res.status(401).json({
      message:"token is not there"
    })
  }

  const userId=decoded.id;
  const post =  await postModel.find({
    user: userId
  })

  res.status(200).json({
    message:"the post requested",
    post
  })

}

// for getting detail about te specific post 
async function getPostDetail(req,res){
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      message:"invalid token"
    })
  }

  let decoded = null;
  try{
    decoded = jwt.verify(token, process.env.JWT_KEY);
  }catch(error){
    return res.status(401).json({
      message:"token not exist"
    })
  }

  const userId = decoded.id;
  const postId = req.params.postId

  const post = await postModel.findById(postId);
  if(!post){
    return res.status(404).json({
      message:"no Post"
    })
  }

  // now will compare user valid or not

  const isValid = post.user.toString() === userId;

  if(!isValid){
    return res.status(403).json({
      message:"invalid user "
    })
  }

  res.status(200).json({
    message:"post fetched details",
    post
  })


}

module.exports = {
  cpostController,
  getPostController,
  getPostDetail
}