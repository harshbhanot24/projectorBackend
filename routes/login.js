const _=require('lodash');
var bcrypt=require('bcrypt')
const validate=require('../validators/validate')
const express=require('express')
const route=express();
var UserSchema = require('../Common/schemas/userSchema');

route.use(express.json());
route.post('/',(req,res)=>{
    const userData=req.body;
   var result= FindUser(userData);
   result.then((response)=>{
       if(response.error){
           console.log(response.error)
           res.status(404).json({status:404,err:response.error})// standard for error 
           res.end();
       }else{
        console.log('this is the login response',response);
        _.pick=(response,['email'],['_id']);
      //this is done to create a plain obj its complex as it comes from DB
        res.status(200).header('X-Requested-With',response.token).json({status:200,token:response.token,Data:response.data});
        res.end();
       }
    
   }).catch((err)=>{
       console.log(err)
    res.status(500).json({status:500,err:err});
   })
   
})

async function FindUser(userData){
    const checkUser=await UserSchema.findOne({email:userData.email}).select('email password');
    if(!checkUser){   
        return {"error":"User doesnot exist"};
    }
        const bool=await bcrypt.compare(userData.password,checkUser.password);// it will decrypt password and return t/f        
        if(!bool)return {"error":"password doesnot match"};
        const token=checkUser.generateAuthtoken();
        return {data:checkUser,token:token};
    
   

}
module.exports=route;