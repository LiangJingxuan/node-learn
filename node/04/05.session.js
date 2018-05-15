const express=require('express');
const session=require('express-session');

const app=express();

app.use(session({
    secret:'liang',
    resave:false,
    saveUninitialized:true
}));

app.get('/',(req,res)=>{
    if(req.session.login){
        res.send('欢迎：'+req.session.username);
    }else{
        res.send('请登录！');
    }
});

app.get('/login',(req,res)=>{
    req.session.login=true;
    req.session.username='liang';
    res.send('成功登陆！');
});

app.listen(8081);