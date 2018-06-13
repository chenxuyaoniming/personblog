var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongodb = require('mongodb').MongoClient;
var db_str = 'mongodb://localhost:27017/zz';
var async = require('async');

var object = require('mongodb').ObjectId;

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
      coll.find({}).sort({_id:-1}).toArray((err,arr)=>{
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
  if(req.session.name){
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
   }else{
    res.send('2')
   }
 
})
//博客详情
router.get('/content',(req,res)=>{
  let  id = object(req.query.id);
  let  arr1 = null;
  let  danmu = null;
  mongodb.connect(db_str,(err,database)=>{
    async.series([
      function(callback){
          database.collection('txt',(err,coll)=>{
            coll.find({'_id':id}).toArray((err,arr)=>{
              arr1 = arr[0];
              // console.log(arr)
               callback(null,"")
            })
          })
         
        },
      function(callback){
         database.collection(req.query.id,(err,coll)=>{
            coll.find({}).toArray((err,arr1)=>{
              danmu = arr1;
              // console.log(danmu)
              callback(null,"") 
            })
          })
          
        },
        function(callback){
          console.log(danmu,arr1)
          res.render('content',{arr:arr1,danmu:danmu,name:req.session.name});
          database.close();
        }
      ])
    })  
})
//弹幕发送
router.post('/content',(req,res)=>{
  console.log(req.body)
   mongodb.connect(db_str,(err,database)=>{
    database.collection(req.body.spl,(err,coll)=>{
      coll.insert(req.body);
      res.send("1");
      database.close()
    })
  })
})
//直播交流
router.get('/connect',(req,res)=>{
  res.render('connect',{name:req.session.name})
})



module.exports = router;
