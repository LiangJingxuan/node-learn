const express=require('express');
const static=require('express-static');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const pathLib=require('path');
const consolidate=require('consolidate');
const mysql=require('mysql');

const common=require('./lib/common');

// 数据库连接池
const db=mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'rootliang',
	database: 'blog'
});

// 创建服务
const server=express();
server.listen(80);

// 1.解析cookie
server.use(cookieParser('s5s54d54fkogodjqakjlfakfjlgkhgoah'));

// 2.使用session
let arr=[];
for(let i=0;i<100000;i++){
	arr.push('keys_'+Math.random());
}
server.use(cookieSession({
	name: 'zns_see_id',
	keys: arr,
	maxAge: 20*3600*1000
}));

// 3.post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './www/upload'}).any());

// 4.配置模板引擎
server.set('view engine','html');
server.set('views','./views');
server.engine('html',consolidate.ejs);

// 5.static文件
server.use(static('./www'));


// 接收用户请求

/**
 *	首页
 */

 // 轮播图
server.get('/',(req,res,next)=>{
	db.query("SELECT * FROM `banner_table`;",(err,data)=>{
		if(err){
			console.log('错误：',err);
			res.status(500).send('数据错误，用重试!').end();
		}else{
			// console.log(data);
			res.banners=data;
			next();
		}
	});
});

// 文章列表
server.get('/',(req,res,next)=>{
	db.query("SELECT `ID`,`title`,`summary` FROM `article_table`;",(err,data)=>{
		if(err){
			console.log('错误',err);
			res.status(500).send('数据错误，用重试!').end();
		}else{
			// console.log(data);
			res.article=data;
			next();
		}
	});
});

// 首页渲染
server.get('/',(req,res)=>{
	res.render('index.ejs',{banners: res.banners, article: res.article});	
});


/**
 *	文章详情
 */

// 详情数据查询并渲染
server.use('/conText',(req,res)=>{
	if(req.query.id){
		// 增加一个赞
		if(req.query.act==='like'){
			db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id};`,(err,data)=>{
				if(err){
					console.log('错误',err);
					res.status(500).send('数据错误，用重试!').end();
				}
			});
		}
		// 显示文章
		db.query(`SELECT * FROM article_table WHERE ID=${req.query.id};`,(err,data)=>{
			if(err){
				console.log('错误',err);
				res.status(500).send('数据错误，用重试!').end();
			}else{
				if(data.length===0){
					res.status(500).send('404页面未找到!').end();
				}else{
					// console.log(data[0]);

					let conTextData=data[0];
					// 时间处理
					conTextData.dateTime=common.timeData(conTextData.post_time);
					// 段落处理
					conTextData.content=conTextData.content.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
					res.render('conText.ejs',{conText:conTextData});
				}
			}
		});

	}else{
		res.status(500).send('404页面未找到!').end();
	}
});