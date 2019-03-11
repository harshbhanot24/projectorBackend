var mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    DateCreated:{type:Date,default:Date.now},
    Active:{type:Boolean,default:true}
}); 
//creating a user class

module.exports=mongoose.model('User',userSchema);
