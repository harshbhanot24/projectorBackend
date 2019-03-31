var mongoose = require('mongoose');
const tagSchema=new mongoose.Schema({
    Name:{type:String,required:true},
    DateCreated:{type:Date,default:Date.now},
    Active:{type:Boolean,default:true}
}); 


module.exports=mongoose.model('Tag',tagSchema);