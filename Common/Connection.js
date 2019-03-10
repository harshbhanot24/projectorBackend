const mongoose=require('mongoose')
    mongoose.connect('mongodb://localhost/dummyDb').
    then(()=>{console.log('connectd')}).catch(err=>console.log(err))
  
    module.exports=mongoose;