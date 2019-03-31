var request = require("request");
const validate=require('../validators/validate')
const express=require('express')
const cors=require('cors')
const route=express();
route.use(cors())
route.use(express.json());
var cache=require('../Common/cache/cache')
var t;
route.get('/',(req,res)=>{
   
var options = { method: 'GET',
  url: 'https://books.zoho.com/api/v3/contacts',
  qs: { organization_id: '649249007' },
  headers: 
   { 'Postman-Token': '729fcbd9-4280-40fa-bcfe-b8d6cab291fe',
     'cache-control': 'no-cache',
     Authorization: 'Zoho-authtoken db36e02a50b57e081efe533a8a0f834b' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
var t=JSON.parse(body);
console.log(t.contacts)
res.json(t.contacts).status(200);
});

});
module.exports=route;

