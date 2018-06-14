var express = require('express');
var router = express.Router();
var mongodb = require("mongodb").MongoClient;
var object = require("mongodb").ObjectId;
var db_str = "mongodb://localhost:27017/zz"
var session = require("express-session");
var async = require("async");
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
				if(arr.length>0){
					req.session.name = req.body.name;
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
////////////////获取数据

router.post('/dk',(req,res)=>{
	let page = null;
	let count = null;
	let num = 11;
	let p=1;
	let arr1 = null;
	console.log(req.body)
	if(req.body.p){
		p = req.body.p
	}else{
		p = 1;
	}
	if(req.body.p<1){
		p=1;
	}
	// console.log(p)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('dk',(err,coll)=>{
			async.series([
					function(callback){
						coll.find({}).toArray((err,arr)=>{
							page = Math.ceil(arr.length/num);
							callback(null,"")
						})
						
					},
					function(callback){
						if(p>page){
							p=page
						}
						coll.find({}).sort({'_id':-1}).limit(num).skip((p-1)*num).toArray((err,arr)=>{
							arr1 = arr;
							callback(null,"")
						})
						
					},
					function(callback){
						res.send({arr:arr1,page:page,p:p});
						database.close();
					}

				])
			
		})
	})
})

//修改数据
router.post('/updel',(req,res)=>{
	let id = object(req.body.id);
	mongodb.connect(db_str,(err,database)=>{
		database.collection("dk",(err,coll)=>{
			coll.update({'_id':id},{$set:{name:req.body.name,Class:req.body.Class,time:req.body.time,pers:req.body.pers}},(err)=>{
				res.send('1');
				database.close();
			})
		})
	})
})

//查找数据
router.post("/find",(req,res)=>{
	let id = object(req.body.id);
	mongodb.connect(db_str,(err,database)=>{
		database.collection("dk",(err,coll)=>{
			coll.find({'_id':id}).toArray((err,arr)=>{
				res.send(arr);
				database.close();
			})
		})
	})
})
//增加数据
router.post("/save",(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection("dk",(err,coll)=>{
			coll.save(req.body,(err)=>{
				res.send("1");
				database.close();
			})
		})
	})
})
//删除数据
router.post('/del',(req,res)=>{
	let id = object(req.body.id);
	mongodb.connect(db_str,(err,database)=>{
		database.collection("dk",(err,coll)=>{
			coll.remove({'_id':id},(err)=>{
				res.send("1");
				database.close();
			})
		})
	})
})


//指定数据查找
router.post('/fd',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		database.collection("dk",(err,coll)=>{
			coll.find(req.body).toArray((err,arr)=>{
				console.log(arr)
				res.send(arr)
			})
		})
	})
})



module.exports = router;
