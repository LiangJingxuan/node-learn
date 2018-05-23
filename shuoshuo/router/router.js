const formidable=require('formidable');
const db=require('../models/db');
const md5=require('../models/md5');
const fs=require('fs');
const pathmodel=require('path');
const gm=require('gm');

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
            });
            return;
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
    },

    // 设置头像视图
    showSetavatar(req,res){
        if(req.session.login!='1'){
            res.send('非法闯入，这个页面要求登录！');
            return;
        }
        res.render('setavatar',{
            'login': true,
            'username': req.session.username,
            'active': '设置',
        });
    },

    // 设置头像操作
    doSetavatar(req,res){
        let form=new formidable.IncomingForm();
        form.uploadDir=__dirname+'/../avatar';
        form.parse(req,(err,fields,files)=>{
            // 改名
            let oldname=files.touxiang.path;
            let newname=__dirname+'/../avatar'+'/'+req.session.username+pathmodel.extname(files.touxiang.name);
            fs.rename(oldname,newname,(err)=>{
                if(err){
                    res.send('头像上传失败！请重试。');
                    return;
                }
                // 缓存文件名给裁切页面使用
                req.session.avatar=req.session.username+pathmodel.extname(files.touxiang.name);
                // 跳转到切的业务，路由重定向
                res.redirect('/cut');
            })
        });
    },

    // 裁切头像视图
    showCut(req,res){
        res.render('cut',{
            'avatar': req.session.avatar
        });
    },

    // 裁切头像操作
    doCut(req,res){
        let filname=req.session.avatar;
        let w=req.query.w;
        let h=req.query.h;
        let x=req.query.x;
        let y=req.query.y;

        // 裁切
        gm('./avatar/'+filname).crop(w,h,x,y).resize(100,100,'!')
            .write('./avatar/'+filname,(err)=>{
                if(err){
                    res.send('-1');
                    return;
                }
                // 更改数据库当前用户的avatar
                db.updateMany('users',{'username':req.session.username},{
                    $set: {'avatar': req.session.avatar}},(err,results)=>{
                    res.send('1');
                });
        })
    },

    // 发表说说操作
    doPost(req,res){
        // 必须保证登录
        if(req.session.login!='1'){
            res.send('非法闯入，这个页面要求登录！');
            return;
        }
        let username=req.session.username;
        // 接收信息
        const form=formidable.IncomingForm();
        form.parse(req,(err,fields)=>{
            let content=fields.content;
            db.insertOne('posts',{
                'username': username,
                'date': new Date(),
                'content': content

            },(err,results)=>{
                // 服务器错误
                if(err){
                    res.send('-3');
                    return;
                }
                // 插入成功
                res.send('1');
            })
        });
    },

    // 说说列表操作
    getAllPost(req,res){
        let page=req.query.page;
        db.find('posts',{},{'pageamount':6,'page':page,'sort':{'datetime':-1}},(err,result)=>{
            res.json(result);
        })
    },

    // 查询用户信息操作
    getUserInfo(req,res){
        let username=req.query.username;
        db.find('users',{'username':username},(err,result)=>{
            let info={'avatar':result[0].avatar};
            res.json(info);
        })
    },

    // 分页数据查询用户信息操作
    getshuoshuoamount(req,res){
        db.getAllCount('posts',(count)=>{
            res.send(count.toString());
        })
    },

    // 个人主页视图
    showUser(req,res){
        let user=req.params['username'];
        db.find('posts',{'username':user},(err,result)=>{
            db.find('users',{'username':user},(err,avatar)=>{
                res.render('user',{
                    'login': req.session.login=='1'?true:false,
                    'username': req.session.login=='1'?req.session.username:'',
                    'user': user,
                    'active': '我的说说',
                    'curentShuoshuo': result,
                    'useravatar': avatar[0].avatar
                });
            });
        });
    },

    // 用户列表视图
    showUserList(req,res){
        db.find('users',{},(err,list)=>{
            res.render('userlist',{
                'login': req.session.login=='1'?true:false,
                'username': req.session.login=='1'?req.session.username:'',
                'active': '用户列表',
                'list': list
            });
        })
    }




};