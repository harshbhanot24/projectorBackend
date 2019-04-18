const express=require('express')
const cors=require('cors')
const app=express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,x-auth-token,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  app.use(express.static(__dirname+'/dist/projectAppLogin'))
const login=require('./routes/login')
const signUp=require('./routes/signUp')
const post=require('./routes/post')
const tags=require('./routes/tags')
const user=require('./routes/user')
const postForm=require('./routes/postForm')
app.use('/login',login);
app.use('/signUp',signUp);
app.use('/posts',post);
app.use('/tag',tags);
app.use('/form',postForm);
app.use('/user',user);
app.get('/',(req,res)=>{
    res.json({"message":"Currently I am not serving you this sorry try something other I have to offer"})
})
app.listen((process.env.PORT || 3000),()=>{
    console.log('working')
})
