const mysql=require('mysql');

// 连接

/*
	服务器
	端口
	用户名
	密码
	库
*/

var db = mysql.createConnection({
	host: '127.0.0.1',
	prot: 3306,
	user: 'root',
	password: 'rootliang',
	database: 'blog'
});


// 查询

db.query("SELECT * FROM `user_table`;",(err,data)=>{
	if(err){
		console.log('错误：',err);
	}else{
		console.log('成功：',JSON.stringify(data));
	}
});