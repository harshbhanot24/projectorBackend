var mongoose = require('mongoose');
var fileSchema=require('./fileSchema')
const postSchema=new mongoose.Schema({
    heading:{type:String,required:true},
    post:{type:String,required:true},
    tags:{type:Array},
    files:[{type:mongoose.Schema.Types.ObjectId,
    ref:'file'}],
    DateCreated:{type:Date,default:Date.now},
    Active:{type:Boolean,default:true},
    Views:{type:Number},
    likes:{type:Number},
    Dislikes:{type:Number}
    //SubmissionID:{[array/subdoc have to see]}
}); 


module.exports=mongoose.model('Post',postSchema);
