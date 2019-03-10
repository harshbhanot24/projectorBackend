var mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    email:String,
    password:String,
    DateCreated:{type:Date,default:Date.now},
    Active:{type:Boolean,default:true}
}); 
//creating a user class

module.exports=mongoose.model('User',userSchema);
