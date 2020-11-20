$(function(){
// 点击去注册的事件
$('#link_reg').on('click',function(){
    $('.login-b').hide();
    $('.reg-b').show();
})
// 点击去登录的事件
$('#link_login').on('click',function(){
    $('.reg-b').hide();
    $('.login-b').show();
})

// 从layUI中获取form元素
var  form=layui.form;
var layer=layui.layer;
// 通过form.verify()函数自定义校验规则
form.verify({
    // 自定义一个password校验规则
pwd:[/^[\S]{6,12}$/,'密码必须6到12位.且不能有空格'],
//校验两次密码是否一致
repwd:function(value){
var pwd=$('.reg-b [name=password]').val()
if (pwd!==value) {
    return '两次密码不一致'
}
}
})
// 监听登录表单的提交事件
// $('#form_login').on('submit',function(){
    $('#form_login').submit(function(e){
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登陆失败')
                    // console.log(222);
                }
                layer.msg('登陆成功')
                // console.log(111);
                // token是为了访问有权限的地方用到的,所以先存到localStorage里以便使用
                localStorage.setItem('token',res.token)
                // 跳转到主页
                location.href='/index.html'
            }
        })
        
    })
  
// })
// 监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
    // 阻止表单元素自动提交
e.preventDefault()
var  data={
    username:$('#form_reg [name=username]').val(),
    password:$('#form_reg [name=password]').val()
}
$.post('/api/reguser',data,function(res){
    if (res.status!==0) {
// console.log(111);
        return layer.msg(res.message)
    }
      layer.msg('注册成功,请登录')  
    //   console.log(222);
    $('#link_login').click();
})

})





})