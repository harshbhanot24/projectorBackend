const express=require('express')
const auth=require('../auth/auth')

ObjectId = require('mongodb').ObjectID;
const route=express();
route.use(express.json());

  var postSchema =require('../Common/schemas/postSchema'); 
  var fileSchema=require('../Common/schemas/fileSchema')
route.post('/',auth,function(req,res){
      savePost(req.body,req.user._id).then(
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
  
  async function savePost(PostData,userCred){
    // console.log("these are the user creds")
    let tagArray=PostData.form.tags;
    let fileID_array=new Array;
    let i=0;
    console.log("this is data coming",PostData)
    const postobj=new postSchema({
      heading:PostData.form.heading,
      post:PostData.form.details,
      tags:PostData.tags,
      user:userCred
    })
    for(let i=0;i<PostData.uploadFileList.length;i++){
      let fileOBJ=new fileSchema({
        originalName:PostData.uploadFileList[i].originalName,
    DBName:PostData.uploadFileList[i].DBName,
    MineType:PostData.uploadFileList[i].MineType,
    Path:PostData.uploadFileList[i].Path
      })
      postobj.files.push(fileOBJ);
    }
    
  return postobj.save(); 
 }

 async function getPosts(){
   const posts=await postSchema.find().populate('user').populate('file');
   return posts;
 } 
 async function getPost(id){
    return await postSchema.findOne({_id:id}).populate('user');
 
 }
module.exports=route;
function high(arr){

}