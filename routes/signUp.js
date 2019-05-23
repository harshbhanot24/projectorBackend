const validate=require('../validators/validate')
var bcrypt=require('bcrypt')
const express=require('express')
const route=express();
var UserSchema = require('../Common/schemas/userSchema');
route.use(express.json());

//route to handle signup request
route.post('/',(req,res)=>{
    const userData=req.body; 
   var result= CreateUser(userData);//this function workson DB
   result.then((response)=>{
       if(response==null){
           res.status(404).json({'err':'username exists'})//ifwe get empty response means user exists
           res.end();
       }else{
        console.log(response);
        res.status(200).json({status:200,data:response});
        res.end();
       }
    
   }).catch((err)=>{
       console.log(err)
    res.status(500).json({"err":"unexpected error occurred"});//DB errors
   })
   
})

async function CreateUser(userData){
const salt =await bcrypt.genSalt(10);// to generate a salt more is the i/p parameter more strong is the salt
const hashpassword=await bcrypt.hash(userData.passwords.password,salt)//here salt is added to the password and random string is generated
    const userObj=new UserSchema({
        email:userData.email,
        password:hashpassword
    })//this is userSchema based on the user I/P
    const checkUser=await UserSchema.findOne({email:userData.email}).select('_id');//here we check if user is already there or not based on the email address
    if(!checkUser){
        const result=await userObj.save();//save the user to db and return the result
        return result;
    }else{
        return null;
    }
}
module.exports=route;