const login=require('../routes/login')
const signUp=require('../routes/signUp')
const post=require('../routes/post')
const tags=require('../routes/tags')
const user=require('../routes/user')
const postForm=require('../routes/postForm')
module.exports= function(app){  

app.use('/login',login);
app.use('/signUp',signUp);
app.use('/posts',post);
app.use('/tag',tags);
app.use('/form',postForm);
app.use('/user',user);
}