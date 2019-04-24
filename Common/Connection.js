const mongoose=require('mongoose')
    const uri="mongodb+srv://admin:Samsung24@cluster0-njc4r.mongodb.net/test?retryWrites=true";
    const url="mongodb://localhost:27017/dummyDb"
    mongoose.connect(url, {useNewUrlParser: true}).
    then(()=>{console.log('connectd')}).catch(err=>console.log(err))
  
    module.exports=mongoose;