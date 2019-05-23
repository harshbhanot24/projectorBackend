const mongoose=require('mongoose')
    const url="mongodb+srv://admin:Samsung24@cluster0-njc4r.mongodb.net/test?retryWrites=true";
    const uri="mongodb://localhost:27017/dummyDb"
    mongoose.connect(uri, {useNewUrlParser: true}).
    then(()=>{console.log('connectd')}).catch(err=>console.log(err))
  
    module.exports=mongoose;