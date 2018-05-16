const formidable=require('formidable');
const db=require('../models/db');
const md5=require('../models/md5');

module.exports={

    // 首页视图
    showIndex(req,res){
        // 检索数据库，查找此人的头像
        if(req.session.login=='1'){
            db.find('users',{username:req.session.username},(err,result)=>{
                let avatar=result[0].avatar || 'moren.jpg';
                res.render('index',{
                    'login': req.session.login=='1'?true:false,
                    'username': req.session.login=='1'?req.session.username:'',
                    'avatar': avatar,
                    'active': '首页',

                });
            })
        }
        res.render('index',{
            'login': req.session.login=='1'?true:false,
            'username': req.session.login=='1'?req.session.username:'',
            'avatar': 'moren.jpg',
            'active': '首页',

        });
    },

    // 注册视图
    showRegister(req,res){
        res.render('register',{
            'login': req.session.login=='1'?true:false,
            'username': req.session.login=='1'?req.session.username:'',
            'active': '注册'

        });
    },

    // 注册操作
    doRegister(req,res){
        // 得到用户填写的内容
        const form=formidable.IncomingForm();
        form.parse(req,(err,fields)=>{
            // 得到表单之后的操作
            let username=fields.username;
            let password=fields.password;
            // 查询数据库中是不是有这个人
            db.find('users',{'username':username},(err,result)=>{
                // 服务器错误
                if(err){
                    res.send('-3');
                    return;
                }
                // 用户名已存在
                if(result.length!==0){
                    res.send('-1');
                    return;
                }
                // 新增用户
                password=md5(md5(password).substr(4,7)+md5(password));
                db.insertOne('users',{
                    'username':username,
                    'password':password,
                    'avatar': 'moren.jpg'

                },(err,results)=>{
                    // 服务器错误
                    if(err){
                        res.send('-3');
                        return;
                    }
                    // 注册成功，写入session
                    req.session.login=1;
                    req.session.username=username;
                    res.send('1');
                })
            })
        });
    },

    // 登录视图
    showLogin(req,res){
        res.render('login',{
            'login': req.session.login=='1'?true:false,
            'username': req.session.login=='1'?req.session.username:'',
            'active': '登录'
        });
    },

    // 登录操作
    doLogin(req,res){
        // 得到用户填写的内容
        const form=formidable.IncomingForm();
        form.parse(req,(err,fields)=>{
            let username=fields.username;
            let password=md5(md5(fields.password).substr(4,7)+md5(fields.password));
            // 查询数据库，看看有没有这个人
            db.find('users',{'username':username},(err,result)=>{
                // 服务器错误
                if(err){
                    res.send('-3');
                    return;
                }
                // 用户不存在
                if(result.length===0){
                    res.send('-1');
                    return;
                }
                // 有的话查看密码是否匹配
                if(result[0].password){
                    // 写入session
                    req.session.login=1;
                    req.session.username=username;
                    res.send('1'); //登录成功
                    return;
                }else{
                    res.send('-2'); // 登录失败密码不正确
                }
            })
        });
    }
};