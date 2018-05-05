const express=require('express');

const app=express();


// 静态服务
app.use('/www',express.static('../01/static'));

// 模板引擎设置
app.set('view engine','ejs');

// 路由
app.get('/express',(req,res)=>{

    // res.send('hello express ...');

    // 模板数据输入
    res.render('index',{
        data: 'lee'
    });
});

// 参数路由
app.get('/user/:uid',(req,res)=>{

    if(/^[\d]{6}$/.test(req.params['uid'])){
        res.send('user : '+req.params['uid']);
    }else{
        res.send('请检查格式...');
    }
});

// ajax返回数据使用send返回json
app.get('/login',(req,res)=>{
    res.send({
        "state":true,
        "token":Math.random()*1000
    });
});

// 404
app.use((req,res)=>{
    res.status(404).send('页面不存在 ...');
});

// 监听端口
app.listen(8081);
