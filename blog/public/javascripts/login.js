$(function(){1
    function  out(obj,time){
            return new Promise(function(resolve,reject){
                obj.slideDown(time)
                setTimeout(function(){
                    resolve()
                },time)
            })
    }
   out($("#login-bg"),1000)
    .then(function(){
       return out($("h1"),600)
   }).then(function(){
        return out($("#form"),1000)
    }).then(function(){
        return out($('#login-btn'),500)
    }).then(function(){
        out($('#login-bottom'),500)
    })


    $("#btn").click(function(){
        $.post('/users/login',{name:$("#user").val(),pass:$("#pass").val()},function(date){
                if(date == 1){
                    alert("登陆成功");
                    location.href = '/';
                }else{
                    alert("账号密码错误")
                    location.reload();
                }
        })
    })

    $("#btn-register").click(function(){
        $.post('/users/register',{name:$("#user").val(),pass:$("#pass").val()},function(date){
                if(date == 1){
                    alert("注册成功");
                    location.href = '/login';
                }else{
                    alert("用户名已存在~！")
                    location.reload();
                }
        })
    })



})