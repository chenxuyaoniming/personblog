
$(function(){
	$("#zhuce").click(function(){
		$("#zhuce-list").stop().fadeToggle(300)
	})
	$("#zhuce-list").click(function(event){

		event.stopPropagation()

	})

	//登录
	$("#btn").click(function(){
		let user = $("#user").val();
		let pass = $("#pass").val();
		$.post("/users/login",
				{name:user,pass:pass},
				function(date){
					if(date == 1){
						$("#zhuce").stop().fadeOut(400);
						$("#denglu").stop().slideUp(400);
						$("#admin").text(user)
					}else{
						alert("账号或密码错误，请重试")
					}

				});
		return false;
	})


	// 发送验证码
	$("#yzm").click(function(){
		var id = $(this).attr("date-id")
		$.ajax({
			type:"post",
			data:{dateid:id,name:$("#zhuce-user").val()},
			url:"/users/registor",
			success:function(data){
				if(data == 1){
					alert("密码已发送到您的手机，请查收")
				}
			}
		})
	})
	//注册
	$("#zhuce-btn").click(function(){
		var id = $(this).attr("date-id");
		var  user = $("#zhuce-user").val();
		var mima = $("#zhuce-pass").val();
		$.ajax({
			type:"post",
			data:{dateid:id,name:user,pass:mima},
			url:"/users/registor",
			success:function(data){
				if(data == 2){
					alert("注册成功！");
					$("#zhuce-list").stop().fadeOut(300);
					$("#user").text(user);
					$("#pass").text(mima);
				}else{
					alert("密码错误，一分钟后请重试")
				}
			}
		})
	})

	
	///////////////////////
	// 时钟
	setInterval(function(){
		let odate = new Date();
		let  h = odate.getHours();
		let  m = odate.getMinutes();
		let  s = odate.getSeconds();
		$("#time").find("i").eq(0).text(""+Math.floor(h/10)+h%10);
		$("#time").find("i").eq(1).text(""+Math.floor(m/10)+m%10);
		$("#time").find("i").eq(2).text(""+Math.floor(s/10)+s%10)
	},1000)


	///////////////////////////////
	// 滑动显示菜单
	$("#footer-left").mouseenter(function(){
		$(this).addClass('bgcolor')
		$("#menu").show()
	})
	$("#menu").mouseenter(function(){
		$(this).show();
		$("#footer-left").addClass("bgcolor");
	})
	$("#footer-left").mouseleave(function(){
		$('#menu').hide();
		$(this).removeClass('bgcolor')
	})
	$("#menu").mouseleave(function(){
		$(this).hide();
		$("#footer-left").removeClass('bgcolor')
	})

	////////////////////////////////////

	// 拖拽效果
	$(".box-top").mousedown(function(e){
		var evt = e || event;
		let left = evt.offsetX;
		let top = evt.offsetY;
		let od = $(this).parent();
		document.onmousemove=function(e){
			var evt = e || event ;
			od.css({"left":evt.clientX - left,"top":evt.clientY - top})
		};
		document.onmouseup=function(){
			document.onmousemove=null ;
			console.log("111")
		}
	})
	//点击关闭
	$(".box-top").find('span').click(function(event){
		$(this).parent().parent().stop().hide();
		event.stopPropagation()
	})

	///////////点击出现///////////////////
	$("#menu").find("ul").find('li').click(function(){
		let index = $(this).index();
		$(".box").eq(index).show(100)
	})

	///点击退出登录

	$("#menu").find("ul").find('li').eq(5).click(function(){
		$("#back").stop().show(100)
	})
	$("#no").click(function(){
		$("#back").stop().hide(100)
	})
})