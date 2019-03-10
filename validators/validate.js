const joi=require('joi')

function validate(user){
    const userSchema={
        email:joi.string().min(3).required(),
        password:joi.string().required().min(3)
    }
    const result=joi.validate(user,userSchema);
    return(result.error || null);
}
module.exports=validate;