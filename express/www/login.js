$(function(){
	var user=$("input[name='user']"),
		pass=$("input[name='pass']");

	// 注册操作
	$('#register').click(function(){
		$.ajax({
			url: 'http://127.0.0.1:9102/register',
			data: {user:user.val(),pass:pass.val()},
			dataType: 'json',
			type:'GET',
			success:function(data){
				if(data.ok){
					alert(data.msg);
				}else{
					alert('注册失败：'+data.msg);
				}
			},
			error:function(){
				alert('通信错误！');
			}
		});
	});

	// 登录操作
	$('#login').click(function(){
		$.ajax({
			url: 'http://127.0.0.1:9102/login',
			data: {user:user.val(),pass:pass.val()},
			dataType: 'json',
			type:'GET',
			success:function(data){
				if(data.ok){
					alert(data.msg);
				}else{
					alert('登录失败：'+data.msg);
				}
			},
			error:function(){
				alert('通信错误！');
			}
		});

	});

})