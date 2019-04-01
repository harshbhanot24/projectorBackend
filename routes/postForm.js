const express=require('express')
const cors=require('cors')
const route=express();
route.use(express.json());
route.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
route.post('/',function(req,res){
    let result=savePost(req.body).then(
      (res)=>console.log("data in DB is",res)
    )
  })
  route.get('/',function(req,res){
    const posts= getPosts().then(
      (result)=>res.status(200).json({status:200,Data:result})
    ).catch(
      (error)=>res.status(400).json({status:400,error:error})
    )
      
  });
  var postSchema = require('../Common/schemas/postSchema');
  async function savePost(userData){
    let tagArray=userData.form.tags;
    let fileID_array=new Array;
    let i=0;
    for(const [key,value] of Object.entries(userData.uploadFileList)){
      fileID_array[i]=(value);
      console.log("type of vlua",typeof(value))
      console.log("this should be ",fileID_array)
      i++;
    }
    
    const postobj=new postSchema({
      heading:userData.form.heading,
      post:userData.form.details,
      tags:tagArray,
      filesArrayID:fileID_array
    })
    return postobj.save();
  }

 async function getPosts(){
   const posts=await postSchema.find();
   return posts;
 } 
module.exports=route;