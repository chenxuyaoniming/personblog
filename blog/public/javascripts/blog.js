
$(function(){
    var E = window.wangEditor
    var editor = new E('#editor');
    editor.customConfig.uploadImgShowBase64 = true ;
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()

    $("#blog-btn1").click(function(){
        console.log("111")
        $("#blog-write").slideUp(300)
        // return false;
    })
    $("#write").click(function(){
        $("#blog-write").slideDown(300);
    })
   $("#blog-btn2").click(function(){
       console.log($('#title').val(),editor.txt.html())
       $.post("/blog", { "title" : $("#title").val() , "content" : editor.txt.html() },function(date){
            if(date == 1){
                alert("文章发表成功");
                location.reload();
            }else{
                alert("请您先登录，再发表");
                // location.reload();
            }
       })
   })



})
