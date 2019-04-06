
const express=require('express')
const cors=require('cors')
const route=express();
route.use(cors())
route.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
var UserSchema = require('../Common/schemas/userSchema');
route.use(express.json());
route.post('/',(req,res)=>{
    const tags=req.body;
  
   var result= CreateTag(tags);
   result.then((response)=>{
       if(response==null){
           res.status(404).json({'err':'Tag already exists'})
           res.end();
       }else{
        console.log(response);
        res.status(200).json(response);
        res.end();
       }
    
   }).catch(()=>{
    res.status(500).json({"error":"unexpected error occurred"});
   })
   
})
route.get('/:id',(req,res)=>{
    
})



async function CreateTag(tag){
    const tagObj=new tagSchema({
        Name:tag.name    
    })
    const CheckTag=await UserSchema.findOne({email:tag.name}).select('_id');
    if(!CheckTag){
        const result=await tagObj.save();
        return result;
    }else{
        return null;
    }
   

}
module.exports=route;