const express=require('express');
const cookieParser=require('cookie-parser');

var server=express();

// cookie
server.use(cookieParser('amyilike')); // 校验签名
server.use('/',function(req,res){

	// 设置签名(防篡改)
	req.secret='amyilike';

	// 设置cookie
	// 名、值、秘钥、地址、有效时间
	res.cookie('user','amy',{signed:true,path:'/amy',maxAge:24*3600*1000});
	
	// 读取cookie
	console.log('未签名：',req.cookies);
	console.log('已签名：',req.signedCookies);

	// 删除cookie
	res.clearCookie('user',{path:'/amy'});

	res.send('cookie test');
	res.end();
});

server.listen(8080);