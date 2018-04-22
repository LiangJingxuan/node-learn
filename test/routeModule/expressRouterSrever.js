const http=require('http');
const app=require('./expressRouterModule');

// 创建服务
http.createServer(app).listen(3000);

// 使用get方法
app.get('/login',function(req,res){
    console.log('login');
    res.end();
});

// 使用post方法
app.post('/user',function(req,res){
    console.log(req.body);
    res.end();
});