const express=require('express');
const common=require('../lib/common.js');
const mysql=require('mysql');

// 数据库连接池设置
const db=mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'rootliang',
	database: 'learn'
});

module.exports=function(){
	let router=express.Router();


	// 检测登录状态
	router.use((req,res,next)=>{
		if(!req.session['admin_id'] && req.url!=='/login'){
			// 没有登录, 重定向到登录页面
			res.redirect('/admin/login');

		}else{
			next();
		}
	});


	// 登录
	router.get('/login',(req,res)=>{
		res.render('admin/login.ejs',{});
	});
	router.post('/login',(req,res)=>{
		console.log(req.body);
		let username=req.body.username;
		let password=common.md5(req.body.password+common.MD5_SUFFIX);

		db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
			if(err){
				console.log(err);
				res.status(500).send('database error').end();
			}else{
				if(data.length==0){
					res.status(400).send('no this admin').end();
				}else{
					if(data[0].password===password){
						// 登录成功
						req.session['admin_id']=data[0].ID;
						res.redirect('/admin/');
					}else{
						res.status(400).send('this password is incorrect').end();
					}
				}
			}
		});
	});


	// 根目录
	router.get('/',(req,res)=>{
		res.render('admin/index.ejs',{});
	});


	// banner操作
	router.get('/banners',(req,res)=>{
		// 删除与编辑
		switch(req.query.act) {
			case 'mod':
				// 编辑
				// 先查出要编辑的原始数据
				db.query(`SELECT * FROM banner_table WHERE ID=${req.query.id}`,(err,data)=>{
					if(err){
						res.status(500).send('database error').end();
					}else if(data.length===0){
						res.status(404).send('data not found').end();
					}else{
						res.render('admin/banners.ejs',{mod_data:data[0]});
					}
				});
				
				break;
			case 'del':
				// 删除
				db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`,(err,data)=>{
					if(err){
						res.status(500).send('database error').end();
					}else{
						res.redirect('/admin/banners');
					}
				});
				
				break;
			default:
				// 查询
				db.query(`SELECT * FROM banner_table`,(err,data)=>{
					if(err){
						res.status(500).send('database error').end();
					}else{
						res.render('admin/banners.ejs',{banners:data});
					}
				});
				break;
		}
	});
	// banner新增
	router.post('/banners',(req,res)=>{
		let title=req.body.title;
		let description=req.body.description;
		let href=req.body.href;

		if(!title || !description || !href){
			res.status(400).send('arg error').end();
		}else{
			db.query(`INSERT INTO banner_table (title,description,href) VALUES('${title}','${description}','${href}')`,(err,data)=>{
				if(err){
					res.status(500).send('database error').end();
				}else{
					res.redirect('/admin/banners');
				}
			});
		}
	});

	return router;
};