
$(function(){

        function move(obj,time){
            return new Promise(function(resolve,reject){
                    obj.stop().animate({marginLeft:0},time*1.5);
                    setTimeout(function(){
                        resolve();
                    },time)
            })
        }
        let  p = $("#p-content-left-bottom").find("p");

        move(p.eq(0),600)
            .then(function(){
                return move(p.eq(1),600)
            })
            .then(function(){
                return move(p.eq(2),600)
            })
            .then(function(){
                return move(p.eq(3),600)
            })
            .then(function(){
               return move(p.eq(4),600)
            })
            .then(function(){
                $("ul").slideDown(600)
            })























    $("li").click(function(event){
        event.stopPropagation();
         $(this).find('.per-open').stop().animate({width:200},500);
        $(this).siblings().find('.per-open').stop().animate({width:0},500)       
    })














})