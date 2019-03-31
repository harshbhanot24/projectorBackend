var mongoose = require('mongoose');
const fileSchema=new mongoose.Schema({
    originalName:{type:String,required:true},
    DBName:{type:String,required:true},
    MineType:{type:String,required:true},
    Path:{type:String,required:true},
    DateCreated:{type:Date,default:Date.now},
   
}); 


module.exports=mongoose.model('file',fileSchema);