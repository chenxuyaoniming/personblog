var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session.name)
  res.render('index', {});
});
router.get('/reload',(req,res)=>{
	req.session.destroy((err)=>{
		res.send("1")
	})
})
router.get('/sess',(req,res)=>{
	if(req.session.name){
		console.log(req.session.name)
		res.send(req.session.name)
	}else{
		res.send('2')
	}
})
module.exports = router;
