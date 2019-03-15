
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
var multer=require('multer');
var store= multer.diskStorage({
destination:function(req,file,cb){
  cb(null,'./uploads');
},
filename:function(re,file,cb){
  cb(null,Date.now()+"."+file.originalname);
}
});

var upload=multer({storage:store}).single('file');
route.post('/',function(req,res,next){
  console.log(req.body.value)
  upload(req,res,function(err){
    console.log(req.body.value)
    if(err){
      return res.status(501).json({error:err})
    }
    console.log('workings')
    return res.status(200).json({originalname:req.file.originalname,uploadname:req.file.fieldname});
    
  });
});
module.exports=route;