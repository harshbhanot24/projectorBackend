const validate=require('../validators/validate')
var bcrypt=require('bcrypt')
const express=require('express')

const route=express();
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
        res.status(200).json({status:200,data:response});

        res.end();
       }
    
   }).catch((err)=>{
       console.log(err)
    res.status(500).json({"error":"unexpected error occurred"});
   })
   
})

async function CreateUser(userData){
const salt =await bcrypt.genSalt(10);
const hashpassword=await bcrypt.hash(userData.passwords.password,salt)
    const userObj=new UserSchema({
        email:userData.email,
        password:hashpassword
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