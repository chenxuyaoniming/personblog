
$(function(){

        $("#index-bg").fadeIn(1000);
        setTimeout(function(){
                $("#index-per").slideDown(800);
                $("#index-prud").slideDown(800);
                $("#index-blog").slideDown(800);
                $("#index-connect").slideDown(800);
        },1200)

        $("#index-per").click(function(){
                location.href='/person';
        })
      
        $("#index-prud").click(function(){
                location.href='/produce'
        })
       $("#index-blog").click(function(){
               location.href = '/blog'
       })
       $("#index-connect").click(function(){
               location.href = '/connect'
       })










})

