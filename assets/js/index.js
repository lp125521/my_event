$(function(){
getUserinfo();

var layer=layui.layer;

$('#btnLoginout').on('click',function(){
    layer.confirm('确认退出?',{icon:3,title:'提示'},function(index){
        localStorage.removeItem('token')
        location.href='/login.html'
        layer.close(index)
    })
})
})
function getUserinfo(){
    $.ajax({
        method: "get",
        url: "/my/userinfo",
      
        success: function (res) {
            if (res.status!==0) {
                return layui.layer.msg('获取失败')
            }
            // 调用函数,渲染用户头像
            renderAvatar(res.data);
        }
    })
    
}
function renderAvatar(user){
    console.log(user);
    var name=user.nickname||user.username
    $('#welcome').html('欢迎&nbsp;&nbsp'+name)
    if (user.user_pic!==null) {
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-ava').hide()
    }else{
        $('.layui-nav-img').hide()
        let first=name[0].toUpperCase()
        $('.text-ava').html(first).show()
    }
}