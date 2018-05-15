const express=require('express');
const session=require('express-session');
const db=require('./db');

const app=express();

app.set('view engine','ejs');

app.use(session({
    secret:'liang',
    resave:false,
    saveUninitialized:true
}));

app.get('/',(req,res)=>{
    if(req.session.login){
        res.send('欢迎：'+req.session.username);
    }else{
        res.render('login');
    }
});

app.get('/login',(req,res)=>{
    if(req.session.login){
        res.send('欢迎：'+req.session.username);
    }else{
        res.render('login');
    }
});

app.get('/checklogin',(req,res)=>{
    let username=req.query.username;
    let password=req.query.password;
    db.find('user',{"username":username},(err,result)=>{
        if(result.length===0){
            res.send('用户不存在！');
            return;
        }
        let dbPwd=result[0].password;
        if(dbPwd===password){
            req.session.login=true;
            req.session.username=result[0].username;
            res.send('登陆成功：'+result[0].username);
        }else{
            res.send('密码错误！');
        }
    })
});

app.listen(8081);