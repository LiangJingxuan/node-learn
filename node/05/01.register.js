const express=require('express');
const formidable=require('formidable');
const db=require('./db');
const md5=require('./md5');

const app=express();

app.set('view engine','ejs');
app.use(express.static('./public'));

// 注册页面
app.get('/register',(req,res)=>{
    res.render('register');
});

// 注册操作
app.post('/doRegister',(req,res)=>{
    let form=new formidable.IncomingForm();
    form.parse(req,(err,fields)=>{
        let username=fields.user;
        let password=fields.password;
        // 加密
        let pwd=md5(md5(password).substr(4,7)+md5(password));
        // 存入数据库
        db.insertOne('test-user',{"user":username,"pwd":pwd},(err,result)=>{
            if(err){
                res.send(false);
            }
            res.send(true);
        })
    });
});

// 登陆页面
app.get('/login',(req,res)=>{
    res.render('login');
});

// 登陆操作
app.post('/doLogin',(req,res)=>{
    let form=new formidable.IncomingForm();
    form.parse(req,(err,fields)=>{
        let username=fields.user;
        let password=md5(md5(fields.password).substr(4,7)+md5(fields.password));
        // 查询数据
        db.find('test-user',{"user":username},(err,result)=>{
            if(result.length===0){
                res.send('0');
                return;
            }
            let dbPwd=result[0].pwd;

            // 比对相同加密结果的密码
            if(password===dbPwd){
                res.send('1');

            }else {
                res.send('-1');
            }
        })
    })
});


app.listen(8081);