const express=require('express');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');

var server=express();

server.use(cookieParser());

var arr=[];
for(var i=0;i<100000;i++){
	arr.push('sig_'+Math.random()+'lee_');
};
server.use(cookieSession({
	name: 'sess',
	keys: arr,
	maxAge: 2*3600*1000
}));

server.use('/',function(req,res){

	// 写
	req.session.user=9102;

	// 读
	console.log(req.session);

	// 删
	// delete req.session;

	res.send('session test');
	res.end();
});

server.listen(8080);