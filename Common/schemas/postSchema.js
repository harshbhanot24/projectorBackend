var mongoose = require('mongoose');
var fileSchema=require('./fileSchema').schema;
var userSchema=require('./userSchema').schema;
const postSchema=new mongoose.Schema({
    heading:{type:String,required:true},
    post:{type:String,required:true},
    tags:{type:Array},
    files:[{type:fileSchema,
      ref:'file'}],
    DateCreated:{type:Date,default:Date.now},
    Active:{type:Boolean,default:true},
    Views:{type:Number},
    likes:{type:Number},
    Dislikes:{type:Number},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
    //SubmissionID:{[array/subdoc have to see]}
}); 

module.exports=mongoose.model('Post',postSchema);
