var mongoose = require('mongoose');
var TagSchema=require('./tagSchema').schema;
const userSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    DateCreated:{type:Date,default:Date.now},
    Active:{type:Boolean,default:true},
        gender:{type:String}
       
            ,College:{type:String},
            UserName:{type:String},
            University:{type:String},
            Specialization:{type:String},
            PassingYear:{type:Number},
            Company:{type:String},
            currentWork:{type:String},
            Preferences:[{type:TagSchema}],
            PostCreatedID:[{type:mongoose.Schema.Types.ObjectId,
                ref:'Post'}]
}); //here we are refering the Post collection
//here we are refering to tags IDs and Tag schema

//creating a user class

module.exports=mongoose.model('User',userSchema);
