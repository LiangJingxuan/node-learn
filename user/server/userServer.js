const HTTPSERVER=require('http');
const URLSERVER=require('url');
const QUERYSTRING=require('querystring');
const FILESYSTEM=require('fs');

// 接口设计(注册)： /user?act=reg&user=liang&pass=123
// 接口设计(登录)： /user?act=login&user=liang&pass=123
// 成功返回数据： {"ok":true,"msg":"原因"}
// 失败返回数据： {"ok":false,"msg":"原因"}

let users={};	// 数据存储 {"liang":"1234","lee":"759"}

const SERVER = HTTPSERVER.createServer(function(req,res){
	// 解析数据
	let str='';
	req.on('data',function(data){
		str+=data;
	});
	req.on('end',function(){
		let obj=URLSERVER.parse(req.url,true);
		const url=obj.pathname;
		const GET=obj.query;
		const POST=QUERYSTRING.parse(str);

		// 区分接口，文件
		if(url==='/user'){
			// 接口处理
			res.writeHead(200, {'Content-type' : 'text/html'});
			switch(POST.act){
				case 'reg':
					if(users[POST.user]){// 检查用户是否已存在
						res.write('{"ok":false,"msg":"此用户已经存在！"}');

					}else{
						// 插入到数据存储
						users[POST.user]=POST.pass;
						res.write('{"ok":true,"msg":"注册成功！"}');

					}
					break;
				case 'login':
					if(users[POST.user]==null){// 检查用户是否已存在
						res.write('{"ok":false,"msg":"此用户不存在！"}');

					}else if(users[POST.user]!==POST.pass){ // 检查用户密码
						res.write('{"ok":false,"msg":"用户或密码错误！"}');

					}else{
						res.write('{"ok":true,"msg":"登录成功！"}');

					}
					break;
				default:
					res.write('{"ok":false,"msg":"未知的请求"}');
			}
			res.end();

		}else{
			// 读取文件
			let fileName='../www'+url;
			FILESYSTEM.readFile(fileName,function(err,data){
				if(err){
					res.write('404');
				}else{
					res.write(data);
				}
				res.end();
			});
		}

	});
});
SERVER.listen(8081);