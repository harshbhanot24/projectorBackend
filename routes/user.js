const validate=require('../validators/validate')
const express=require('express')
const cors=require('cors')
const route=express();
route.use(cors())

const mongoose=require('../Common/Connection')
var UserSchema = require('../Common/schemas/userSchema');
route.use(express.json());
//get users
route.get('/:id',(req,res)=>{
    let id=req.params.id;
    console.log('hy',id)
    if(mongoose.Types.ObjectId.isValid(id)){//check if id is valid only then it should hit DB
        var result= GetUser(id);
        result.then((response)=>{
            if(response==null){
                res.status(404).json({'status':404,'err':'User Doesnot exists'})
                res.end();
            }else{
             console.log(response);
             res.status(200).json(response);
             res.end();
            }
         
        }).catch(()=>{
         res.status(500).json({"error":"unexpected error occurred"});
        })
    }else{
        res.status(404).json({status:'404','err':'Not a Valid UserID'})
    }
  
   
})
//update basic user details
route.put('/:id',(req,res)=>{
    let id=req.params.id;
   
    if(mongoose.Types.ObjectId.isValid(id)){
        console.log(req.body)
        let users=UpdateBasicUser(id,req.body);
        users.then((data)=>{
            res.json({status:200,data:data,from:'basic form  update put'})
        }).catch((err)=>{
            res.json({status:500,err:'Unexpected Error occured'})
        })
    } 
    else{
        res.json({status:404,err:'User Doesnot exist to update'})
    }
})
// update college details
route.put('/college/:id',(req,res)=>{
    let id=req.params.id;
    console.log('hy put',id)
    if(mongoose.Types.ObjectId.isValid(id)){
        console.log(req.body)
        let users=UpdateBasicUser(id,req.body);
        users.then((data)=>{
            res.json({status:200,data:data,from:'college update put'})
        }).catch((err)=>{
            res.json({status:500,err:'Unexpected Error occured'})
        })
    } 
    else{
        res.json({status:404,err:'User Doesnot exist to update'})
    }
})
async function UpdateBasicUser(id,user){
    console.log('user coming from client is', user)
   return await UserSchema.findByIdAndUpdate(id,{$set:user})
//    .then((res)=>{
//     return res;
// }).catch((err)=>{
//     console.log('this is DB error')
//     return err;
// });
}
async function GetUser(id){
    const User=await UserSchema.findById(id);
    if(User){
       return User;
    }else{
        return null;
    }
}//this will check if user is present in DB via ID and send it otherwise sends null which will be returned as 404 error
module.exports=route;