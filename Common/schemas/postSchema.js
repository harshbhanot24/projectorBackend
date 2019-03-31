var mongoose = require('mongoose');
const postSchema=new mongoose.Schema({
    heading:{type:String,required:true},
    post:{type:String,required:true},
    tags:{type:Array},
    filesArrayID:{type:Array},
    DateCreated:{type:Date,default:Date.now},
    Active:{type:Boolean,default:true}
}); 


module.exports=mongoose.model('Post',postSchema);
