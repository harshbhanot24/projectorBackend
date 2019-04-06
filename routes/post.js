//this is used to add a single file upload to the
const express=require('express')
const cors=require('cors')
const route=express();
route.use(express.json());
var fileSchema = require('../Common/schemas/fileSchema');
route.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
var multer=require('multer');
var store= multer.diskStorage({
destination:function(req,file,cb){
  cb(null,'./uploads');
},
filename:function(re,file,cb){
  cb(null,Date.now()+"."+file.originalname);
}
});


//uploading to DB, now we have file schema let us see how it
var upload=multer({storage:store}).single('file');

route.post('/',function(req,res,next){
  let id;
  upload(req,res,function(err){
    if(err){
      return res.status(501).json({error:err})
    }
   SaveFile(req).then((resultSet)=>{
     
      id=resultSet._id;
      return res.status(200).json({id});
    }).catch(
      (err)=>{
        console.log(err)
        return res.status(404).json({status:404,err:err});
      }
    );
    
  });
  
});



module.exports=route;


async function SaveFile(req){
  const fileData=new fileSchema({
    originalName:req.file.originalname,
  DBName:req.file.filename,
  MineType:req.file.mimetype,
  Path:req.file.path
  })
 const result=await fileData.save();
 return result;
  }