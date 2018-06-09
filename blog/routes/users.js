var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var db_str = 'mongodb://localhost:27017/zz';
var session = require('express-session');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res){
  let obj = req.body
  mongodb.connect(db_str,(err,datebase)=>{
    datebase.collection('users',(err,coll)=>{
      coll.find(obj).toArray((err,arr)=>{
          if(arr.length>0){
            req.session.name = obj.name;
            res.send('1');
          }else{
            res.send('2');
          }
          datebase.close();
      })
    })
  })
})

router.post('/register',function(req,res){
  let obj = req.body;
  mongodb.connect(db_str,(err,datebase)=>{
    datebase.collection('users',(err,coll)=>{
      coll.find({name:obj.name}).toArray((err,arr)=>{
          if(arr.length>0){
            res.send('2');
          }else{
            coll.save(obj);
            res.send('1');
          }
          datebase.close();
      })
    })
  })
})






module.exports = router;
