$(function(){

var form=layui.form;
var layer=layui.layer;

form.verify({
        nickname:function(value){
            if(value.length>6){
                 return '昵称长度必须在1-6位之间!'
            }
}

})
initUserinfo();

function initUserinfo(){
   $.ajax({
        method: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status!==0) {
                return layer.msg('获取用户信息失败')
            }
            console.log(res.data);
            form.val('formUserinfo', res.data)//快速给表单赋值
        }
    });
}
// 表单重置
 $('#btnReset').on('click',function(e){

e.preventDefault()

initUserinfo();


 })
// 发起请求更新用户信息
$('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        method:'post',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg('更新用户信息失败')
            }
            layer.msg('更新用户成功')

            window.parent.getUserinfo()
        }
    })
})









})