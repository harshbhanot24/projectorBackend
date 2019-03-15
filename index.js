const express=require('express')
const cors=require('cors')
const app=express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

const login=require('./routes/login')
const signUp=require('./routes/signUp')
const post=require('./routes/post')
app.use('/login',login);
app.use('/signUp',signUp);
app.use('/posts',post);
app.get('/',(req,res)=>{
    res.json({"message":"hy friends"})
})
app.listen((process.env.PORT || 3000),()=>{
    console.log('working')
})
