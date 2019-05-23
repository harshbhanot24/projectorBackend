const _=require('lodash');
var bcrypt=require('bcrypt')// USED FOR password encryption
const validate=require('../validators/validate')
const express=require('express')
const route=express();
var UserSchema = require('../Common/schemas/userSchema');
route.use(express.json());//so as to get JSON data from user

//login request handler
route.post('/',(req,res)=>{
    const userData=req.body;
   var result= FindUser(userData);// this function will find user in DB
   result.then((response)=>{
       if(response.error){
           res.status(404).json({status:404,err:response.error})// standard for error 
           res.end();
       }
       else{
       _.pick=(response,['email'],['_id']);
      //this is done to create a plain obj its complex as it comes from DB
        res.status(200).header('X-Requested-With',response.token).json({status:200,token:response.token,Data:response.data});// we are sending token as wel las data from DB as response
        res.end();
       }
    
   }).catch((err)=>{
       console.log(err)
    res.status(500).json({status:500,err:err});// in case of an unknown error 
   })
   
})

async function FindUser(userData){
    const checkUser=await UserSchema.findOne({email:userData.email}).select('email password');// here we'll find email password of user based upon login data i.e email(here email is unique)
    if(!checkUser){   
        return {"error":"User doesnot exist"};// EMail does not exist
    }
        const bool=await bcrypt.compare(userData.password,checkUser.password);// it will decrypt password and return t/f        
        if(!bool)return {"error":"password doesnot match"};
        const token=checkUser.generateAuthtoken();//otherwise send the user and token 
        return {data:checkUser,token:token};
}
module.exports=route;