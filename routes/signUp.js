const validate=require('../validators/validate')
const express=require('express')
const cors=require('cors')
const route=express();
route.use(cors())
const mongoose=require('../Common/Connection')
var UserSchema = require('../Common/schemas/userSchema');
route.use(express.json());
route.post('/',(req,res)=>{
    const userData=req.body;
  
   var result= CreateUser(userData);
   result.then((response)=>{
       if(response==null){
           res.status(404).json({'err':'username exists'})
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

async function CreateUser(userData){
    const userObj=new UserSchema({
        email:userData.email,
        password:userData.passwords.password
    })
    const checkUser=await UserSchema.findOne({email:userData.email}).select('_id');
    if(!checkUser){
        const result=await userObj.save();
        return result;
    }else{
        return null;
    }
   

}
module.exports=route;