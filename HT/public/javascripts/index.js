
$(function(){
	///////////////////////
	$.get('/sess',function(date){
		console.log(date)
		if(date !=2){
			$("#admin").text(date)
			$("#zhuce").fadeOut(400);
			$("#denglu").slideUp(400);
		}
	})
	/////////////////////////////////////////
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
					$("#user").val(user);
					$("#pass").val(mima);
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
		od.css('z-index',5)
		$(".box-top").not(this).parent().css("z-index","2");
		document.onmousemove=function(e){
			var evt = e || event ;
			od.css({"left":evt.clientX - left,"top":evt.clientY - top});
			event.stopPropagation();
		};
		document.onmouseup=function(){
			document.onmousemove=null ;
		}
		event.stopPropagation();
	})
	//点击关闭
	$(".box").find('span').click(function(event){
		$(this).parent().hide(300);
		event.stopPropagation()
	})

	///////////点击出现///////////////////
	$("#menu").find("ul").find('li').click(function(){
		let index = $(this).index();
		if(index == 5){
			return;
		}else{
			$(".box").eq(index).show(100)
		}		
	})

	///点击退出登录

	$("#menu").find("ul").find('li').eq(5).click(function(){
		$("#back").stop().show(100)
	})
	$("#no").click(function(){
		$("#back").stop().hide(100)
	})

	///点击注销
	$('#yes').click(function(){
		$.get('/reload',function(date){
			if(date == 1){
				$('#denglu').slideDown(400);
				$("#zhuce").fadeIn(400);
				$("#back").stop().hide(100);
			}
		})
	})


	/////////////////////////////////////////////////////////////////

	// 获取所有数据
	function dk(p,tim1,per1){
		$.post("/users/dk",{p:p,time:tim1,pers:per1},function(date){
			$("#coll").find(".table").text("");
			$(".page").text("")
			let  str1 = `<tr>
							<th>姓名</th>
							<th>部门</th>
							<th>工号</th>
							<th>年龄</th>
							<th>操作</th>
						</tr>`;
			let str2 = "" ;			
				date['arr'].map(function(item){
					str2 +=`<tr>
								<td>${item.name}</td>
								<td>${item.Class}</td>
								<td>${item.time}</td>
								<td>${item.pers}</td>
								<td>
									<span class="updel" date-id="${item._id}">修改</span>
									<span class="del" date-id="${item._id}">删除</span>
								</td>
							</tr>`
				})
				$("#coll").find(".table").append(str1,str2)
			if(date.page>5){
				let str1=`<b date-id="${date.p-1}">上一页</b>
						<b date-id="1"> 1 </b>
						<b date-id="2"> 2 </b>
						<b date-id=""> ... </b>
						<b date-id="${date.page-1}">${date.page-1}</b>
						<b date-id="${date.page}">${date.page}</b>
						<b date-id="${date.p+1}>">下一页</b>`;
					$('.page').append(str1)	 
			}else{
				let str1=`<b date-id="${date.p-1}">上一页</b>`;
				let str2 = "";
				for(let i=0;i<date['page'];i++){
					str2+=`<b date-id="${i+1}">${i+1}</b>`
				}
				let  str3 = `<b date-id="${date.p+1}">下一页</b>`;
				$(".page").append(str1,str2,str3)
			}
			$(".page").find('b').click(function(){
				let id = $(this).attr("date-id");
				dk(id);
				event.stopPropagation();
			});
			// re()						
		})
	}
	dk(1);
	// 数据修改完确认
	$("#up-btn").click(function(){
		
		let name = $(this).siblings(".users1").val();
		let Class =$(this).siblings(".Class1").val();
		let time =$(this).siblings(".time1").val();
		let per =$(this).siblings(".pers").val();
		let id =$(this).attr("date-id")
		$.post('/users/updel',{id:id,name:name,Class:Class,time:time,pers:per},function(date){
			if(date == 1){
				alert("数据修改成功！");
				
				$("#update").hide(300);
				dk(1)
			}
		})

	})
	/////数据增加
	$("#save-btn").click(function(){
		
		let name = $(this).siblings(".users1").val();
		let Class =$(this).siblings(".Class1").val();
		let time =$(this).siblings(".time1").val();
		let per =$(this).siblings(".pers").val();
		$.post('/users/save',{name:name,Class:Class,time:time,pers:per},function(date){
			if(date == 1){
				alert("数据添加成功！");
				$("#save").hide(300);
				dk(1)
			}
		})
	})
	// 数据搜索
	$("#fd-btn").click(function(){
		let box = $(this);
		search(box)
	})
	//数据搜索ajax
	function search(box){
		let name = box.siblings(".users1").val();
		let Class =box.siblings(".Class1").val();
		let time =box.siblings(".time1").val();
		let per =box.siblings(".pers").val();
		var obj = {
			name:name,
			Class:Class,
			time:time,
			pers:per
		}
		let robj = {};
		$.each(obj,function(key){
			if(obj[key]){
				var reg = new RegExp(obj[key]);
				robj[key] = reg ;
			}
		})
		console.log(robj)
		$.get('/users/fd',function(date){
			$("#fd-show").find(".table").text("")
			let arr = [];
			let num = 0;
			for(var i in robj){
				num ++
			}
			date.map(function(item){
				var a = 0;
				$.each(item,function(key,val){
					if(robj[key]){
						if(robj[key].test(val)){
							++a;
						}
						if(a == num){
							arr.push(item)
						}
					}
				})
			})
			let str = "";
			$("#fd-show").show(300)
			let str2 = "" ;
			let  str1 = "";
			arr.map(function(item){
					str1 = `<tr>
							<th>姓名</th>
							<th>部门</th>
							<th>工号</th>
							<th>年龄</th>
							<th>操作</th>
						</tr>`;	
					str2 +=`<tr>
								<td>${item.name}</td>
								<td>${item.Class}</td>
								<td>${item.time}</td>
								<td>${item.pers}</td>
								<td>
									<span class="updel" date-id="${item._id}">修改</span>
									<span class="del" date-id="${item._id}">删除</span>
								</td>
							</tr>`
				
			})
			$("#fd-show").find(".table").append(str1,str2);
			// re()
		})
	}
	///////////////////事件委托///////////////////////
	$(".table").click(function(event){
		var $tar = $(event.target)
		if($tar.attr('class')== 'updel'){
			let id =$tar.attr("date-id");
			console.log(id)
				$.post("/users/find",{id:id},function(date){
					console.log(date);
					$("#update").show(300);
					$("#update").find(".users1").val(date[0].name);
					$("#update").find(".Class1").val(date[0].Class);
					$("#update").find(".time1").val(date[0].time);
					$("#update").find(".pers").val(date[0].pers);
					$("#update").find("#up-btn").attr("date-id",date[0]._id)
				})
		};
		if($tar.attr('class')== 'del'){
			$("#del-box").show(300)
				let id = $tar.attr("date-id");
				$("#del-no").click(function(event){
					$("#del-box").hide(300);
					event.stopPropagation();
				})
				$("#del-yes").click(function(event){
					$.post('/users/del',{id:id},function(date){
						if (date==1) {
							// alert("数据删除完成");
							$("#del-box").hide(300);	
						}
						dk(1)
					})
					event.stopPropagation();
				})
		}
		
	})

	/////////////////添加删除////////////////////////////
	// 排序
	$("#gh").click(function(){
		dk(1,-1)
	})
	$("#year").click(function(){
		dk(1,null,1)
	})

})