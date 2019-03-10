const mongoose=require('mongoose')
    const uri="mongodb+srv://admin:Archer@123@cluster0-njc4r.mongodb.net/test?retryWrites=true";
    
    mongoose.connect(uri, {useNewUrlParser: true}).
    then(()=>{console.log('connectd')}).catch(err=>console.log(err))
  
    module.exports=mongoose;