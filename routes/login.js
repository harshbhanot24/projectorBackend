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
  console.log("inside login",userData)
   var result= FindUser(userData);
   result.then((response)=>{
       if(response.error){
           console.log(response.error)
           res.status(404).json({status:404,err:response.error})// standard for error 
           res.end();
       }else{
        console.log(response);
        res.status(200).json({status:200,res:response});
        res.end();
       }
    
   }).catch((err)=>{
       console.log(err)
    res.status(500).json({status:500,err:err});
   })
   
})

async function FindUser(userData){
    const userObj=new UserSchema({
        email:userData.email,
        password:userData.password
    })
    const checkUser=await UserSchema.findOne({email:userData.email}).select('email password');
    if(!checkUser){   
        return {"error":"User doesnot exist"};
    }else if(checkUser.password!=userData.password){
        return {"error":"password doesnot match"};
    }
    else{
        return checkUser;
    }
   

}
module.exports=route;