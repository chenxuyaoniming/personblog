var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongodb = require('mongodb').MongoClient;
var db_str = 'mongodb://localhost:27017/zz';
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GCF的个人博客' ,name:req.session.name});
});
router.get('/reload',(req,res)=>{
  req.session.destroy((err)=>{
    res.redirect('/');
  })
})
//渲染登录页面
router.get('/login',function(req,res){
  res.render('login',{})
})
//渲染注册页面
router.get('/register',function(req,res){
  res.render('register',{})
})
//渲染个人主页
router.get('/person',(req,res)=>{
  res.render('person',{name:req.session.name})
})
//渲染经历页面
router.get('/produce',(req,res)=>{
  res.render('produce',{name:req.session.name})
})

//技术分享页面
router.get("/blog",(req,res)=>{

  let page = null;
  let showN = 6 ;
  let count = null;
  var p =null;
  let newarr = null;
  if(req.query.page){
    p = req.query.page;
  }else{
    p=1
  };
  if(req.query.page<1){
    p=1
  };

  mongodb.connect(db_str,(err,datebase)=>{
    datebase.collection('txt',(err,coll)=>{
      coll.find({}).toArray((err,arr)=>{
        async.series([
          function(callback){
            count = arr.length;
            page = Math.ceil(count/showN);
              if(p>page){
                p=page
              };
            callback(null,"")
          },
          function(callback){
            newarr = arr.splice((p-1)*showN,showN);
            callback(null,"")
          },
          function(callback){
            
            res.render('blog',{name:req.session.name,page:page,newarr:newarr,count:count,p:p})
            datebase.close()
          }
        ])
      })
    })
  })
})
//发表
router.post('/blog',(req,res)=>{
  let tit = req.body;
  console.log(tit)
  mongodb.connect(db_str,(err,datebase)=>{
    datebase.collection('txt',(err,coll)=>{
      coll.save(tit,(err)=>{
        if (err){
          res.send(err);
        }else{
          res.send("1");
        }
        datebase.close();
      })
    })
  })
})





module.exports = router;
