const express=require('express')
const cors=require('cors')
const app=express();
app.use(cors())
const login=require('./routes/login')
const signUp=require('./routes/signUp')
const post=require('./routes/post')
app.use('/login',login);
app.use('/signUp',signUp);
app.use('/post',post);
app.get('/',(req,res)=>{
    res.json({"message":"hy friends"})
})
app.listen((process.env.PORT || 3000),()=>{
    console.log('working')
})
