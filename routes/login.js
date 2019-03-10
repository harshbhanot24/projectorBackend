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
  
   var result= FindUser(userData);
   result.then((response)=>{
       if(response.error){
           console.log(response.error)
           res.status(404).json(response.error)
           res.end();
       }else{
        console.log(response);
        res.status(200).json(response);
        res.end();
       }
    
   }).catch((err)=>{
    res.status(500).json(err);
   })
   
})

async function FindUser(userData){
    const userObj=new UserSchema({
        email:userData.email,
        password:userData.passwords.password
    })
    const checkUser=await UserSchema.findOne({email:userData.email}).select('email password');
    if(!checkUser.email){
        
        return {"error":"email doesnot exist"};
    }else if(!checkUser.password){
        return {"error":"password doesnot exist"};
    }else if(checkUser.password!=userData.passwords.password){
        return{"error":"Wrong Password"}
    }
    else{
        return checkUser;
    }
   

}
module.exports=route;