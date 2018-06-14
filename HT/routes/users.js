var express = require('express');
var router = express.Router();
var mongodb = require("mongodb").MongoClient;
var object = require("mongodb").ObjectId;
var db_str = "mongodb://localhost:27017/zz"
var session = require("express-session");

const SMSClient = require('@alicloud/sms-sdk');
const accessKeyId = 'LTAIyY2rWERNxjj8';
const secretAccessKey = 'Yxpd9OF4lhqWFEgNdknG8IfhkgCe3E';
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登录检测
router.post('/login',(req,res)=>{
	console.log(req.body)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('user2',(err,coll)=>{
			coll.find(req.body).toArray((err,arr)=>{
				if(arr){
					res.send("1");
				}else{
					res.send('2')
				}
				database.close();
			})
		})
	})
})
//注册
var code = null ;
router.post('/registor',(req,res)=>{
	res.header('Access-Control-Allow-Origin','*')
	// console.log(req.body.user)
	var count = req.body.name;
	console.log(count)
	if(req.body.dateid == 1){
		code = yzm();
		send(count,code);
		res.send("1")
	}else{
		if(code == req.body.pass){
			mongodb.connect(db_str,(err,database)=>{
				database.collection('user2',(err,coll)=>{
					coll.save({name:req.body.name,pass:req.body.pass},(err)=>{
						if(err){
							res.session.name = req.body.name;
							res.send("1");
						}else{
							res.send('2');
						}
						database.close();
					})
				})
			})
		}else{
			res.send("5")
		}
	}
	
})




//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
//发送短信

function send(pho,code){
	smsClient.sendSMS({
	    PhoneNumbers: pho,
	    SignName: 'amanda应用',
	    TemplateCode: 'SMS_137425245',
	    TemplateParam: '{"code":"'+code+'"}'
	}).then(function (res) {
	    let {Code}=res
	    if (Code === 'OK') {
	        //处理返回参数
	        console.log(res)
	    }
	}, function (err) {
	    console.log(err)
	})
}

function yzm(){
	var code = Math.floor(Math.random()*10000);
	return code  ;
}

module.exports = router;
