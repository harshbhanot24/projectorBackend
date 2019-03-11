
const express=require('express')
const cors=require('cors')
const route=express();
route.use(cors())
route.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
route.post('/',(req,res)=>{
    console.log(req.body)
    res.json("hy")
})
module.exports=route;