const express=require('express');
const eStatic=require('express-static');

const server=express();
server.listen(9102);

// 数据存储-代替数据库
let USERDB={"lee":'123',"liang":'123'};

// 登录
server.use('/login',function(req,res){

	// console.log(req.query);

	let user=req.query['user'];
	let pass=req.query['pass'];

	if(USERDB[user]==null){
		res.send({"ok":false,"msg":"用户不存在！"});
	}else if(USERDB[user]!==pass){
		res.send({"ok":false,"msg":"账号或密码不正确！"});
	}else{
		res.send({"ok":true,"msg":"登录成功！"});
	}

	res.end();
});

// 注册
server.use('/register',function(req,res){
	
	let user=req.query['user'];
	let pass=req.query['pass'];

	if(USERDB[user]){
		res.send({"ok":false,"msg":"用户已存在！"});
	}else{
		USERDB[user]=pass;
		res.send({"ok":true,"msg":"注册成功！"});
	}

	res.end();
});

// 读取前端静态文件
server.use(eStatic('./www'));