const express=require('express')
const cors=require('cors')
const app=express();
app.use(cors())
const login=require('./routes/login')
const signUp=require('./routes/signUp')
app.use('/login',login);
app.use('/signUp',signUp);
app.get('/',(req,res)=>{
    res.send('hy')
})
app.listen(3000,()=>{
    console.log('working')
})
