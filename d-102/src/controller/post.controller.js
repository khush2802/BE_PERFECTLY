const postModel = require("../models/post.model");

const ImageKit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs");


     const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRI_KEY // This is the default and can be omitted
});

async function cpostController(req,res){
     console.log(req.body);
     console.log(req.file);


const file = await client.files.upload({
     file: await toFile(Buffer.from(req.file.buffer),"file"),
     fileName:"b"})
     res.send(file);
     
}



module.exports = {
     cpostController
}