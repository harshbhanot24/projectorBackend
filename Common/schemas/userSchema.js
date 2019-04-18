const jwt=require('jsonwebtoken')
var mongoose = require('mongoose');
var TagSchema=require('./tagSchema').schema;
const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    DateCreated:{type:Date,default:Date.now},
    Active:{type:Boolean,default:true},
    Role:{type:Boolean,default:true},
        gender:{type:String}
            ,College:{type:String},
            UserName:{type:String, unique:true},
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
//now we ll create a method to create JWT token here.
userSchema.methods.generateAuthtoken=function(){
    const token=jwt.sign({_id:this.id,email:this.email,role:this.role},'mykey');
    return token;
}
module.exports=mongoose.model('User',userSchema);
module.exports.schema=userSchema;