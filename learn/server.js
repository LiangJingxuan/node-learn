const express=require('express');
const static=require('express-static');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const expressRoute=require('express-route');
const multer=require('multer');
const multerObj=multer({dest:'./static/upload'});

const server=express();
server.listen(8081);

// 1.获取请求数据
server.use(bodyParser.urlencoded()); // post数据接收
server.use(multerObj.any()); // 文件上传


// 2.cookie、session
server.use(cookieParser());

let keys=[];
for(let i=0;i<100000;i++){
	keys.push('key_'+keys[i]+Math.random());
}
server.use(cookieSession({
	name: 'sess_id',
	keys: keys,
	maxAge: 20*60*1000 //20分钟
}));


// 3.模板
server.engine('html',consolidate.ejs);
server.set('views','views');
server.set('view engine','html');


// 4.route
server.use('/',require('./route/web.js')());
server.use('/admin/',require('./route/admin.js')());


// 5.default: static
server.use(static('./static'));