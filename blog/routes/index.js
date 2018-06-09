var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GCF的个人博客' ,name:req.session.name});
});
router.get('/reload',(req,res)=>{
  req.session.destroy((err)=>{
    res.redirect('/');
  })
})

router.get('/login',function(req,res){
  res.render('login',{})
})

router.get('/register',function(req,res){
  res.render('register',{})
})

router.get('/person',(req,res)=>{
  res.render('person',{name:req.session.name})
})
module.exports = router;
