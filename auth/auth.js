const jwt=require('jsonwebtoken')
 module.exports=function (req,res, next){
  let token =req.header('x-auth-token');
  if(!token)
    return res.status(401).json({error:'access deneied'})
    try{
    const decoded=jwt.verify(token,'mykey');
        req.user=decoded;
        next();
}
    catch{
        res.status(400).json({error:'not a validtoken'})
        res.end();
    }
}