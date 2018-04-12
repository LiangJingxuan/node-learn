const express=require('express');
const static=require('express-static');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const pathLib=require('path');

const consolidate=require('consolidate');
// const ejs=require('ejs');
// const jade=require('jade');

const server=express();
server.listen(8081);

// 1.解析cookie
server.use(cookieParser('s5s45d45d45sa5c45gd54ggdd4asvggzxq'));

// 2.使用session
let arr=[];
for(let i=0;i<100000;i++){
	arr.push('keys_'+Math.random());
};
server.use(cookieSession({name: 'zns_sess_id',keys: arr,maxAge: 20*3600*1000}));

// 3.psot数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './www/upload'}).any());

// 4. 配置模板引擎
// 输出
server.set('view engine','html');
// 模板文件位置
server.set('views','./views');
// 模板引擎选择
server.engine('html',consolidate.ejs);

// 用户请求
server.use('/index',function(req,res,next){
	// console.log(req.query, req.body, req.files, req.cookies, req.session);
	req.session.userid=9102;

	if(req.session.userid){
		// 登录过
		res.render('login.ejs',{name:'lee'});
	}else{
		// 未登录
		res.render('logout.ejs',{msg:'请登录'});

	};

	next();
});

// 文件上传
server.use('/up',function(req,res){
	// 文件上传处理
	// 文件名设置
	console.log(req.files);
	console.log(req.pathLib);

	let newName=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;
	fs.rename(req.files[0].path,newName,function(err,data){
		if(err){
			// console.log(err);
			res.send('upload error!');
		}else{
			res.send('upload success!');
		}
	});
})

// 5.static数据
server.use(static('./www'));