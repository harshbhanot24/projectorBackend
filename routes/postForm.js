const express=require('express')
const cors=require('cors')
ObjectId = require('mongodb').ObjectID;
const route=express();
route.use(express.json());
route.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  var postSchema =require('../Common/schemas/postSchema'); 
  var fileSchema=require('../Common/schemas/fileSchema')
route.post('/',function(req,res){
      savePost(req.body).then(
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
  route.get('/:id',function(req,res){
    const posts= getPost(req.params.id).then(
      (result)=>res.status(200).json({Data:result})
    ).catch(
      (error)=>res.status(400).json({error:error})
    )
      
  });
  
  async function savePost(userData){
    let tagArray=userData.form.tags;
    let fileID_array=new Array;
    let i=0;
    console.log("this is data coming",userData)
    const postobj=new postSchema({
      heading:userData.form.heading,
      post:userData.form.details,
      tags:userData.tags,
      
    })
    for(let i=0;i<userData.uploadFileList.length;i++){
      let fileOBJ=new fileSchema({
        originalName:userData.uploadFileList[i].originalName,
    DBName:userData.uploadFileList[i].DBName,
    MineType:userData.uploadFileList[i].MineType,
    Path:userData.uploadFileList[i].Path
      })
      postobj.files.push(fileOBJ);
    }
    
  return postobj.save();  }

 async function getPosts(){
   const posts=await postSchema.find().Populate('files');
   return posts;
 } 
 async function getPost(id){
    return await postSchema.findOne({_id:id}).Populate('files');
 
 }
module.exports=route;