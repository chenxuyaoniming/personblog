
var  net = require("net");

var  ws = require("ws").Server;
var  wss  = new ws({port:4396});
var  obj = new Object();
var i=0;

wss.on('connection',(client)=>{
    obj[++i] = client,
    client.id = i ;
    client.on('message',(data)=>{
        console.log("新消息："+data)
        send(client,data)
    })
})

function send(client,message){
    for(var n in obj){
            obj[n] .send(client.id+"说:"+message)
    }
}       