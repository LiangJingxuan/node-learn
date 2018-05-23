const express=require('express');
const router=require('./router/router');
const session=require('express-session');

const app=express();

app.set('view engine','ejs'); // 模板引擎
app.use(express.static('./public')); // 静态页面
app.use('/avatar',express.static('./avatar')); // 静态页面
// 配置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

/* 路由 */
app.get('/',router.showIndex); // 首页视图
app.get('/register',router.showRegister); // 注册视图
app.post('/doRegister',router.doRegister); // 注册操作
app.get('/login',router.showLogin); // 登录视图
app.post('/doLogin',router.doLogin); // 登录操作
app.get('/setavatar',router.showSetavatar); // 设置头像视图
app.post('/doSetavatar',router.doSetavatar); // 设置头像操作
app.get('/cut',router.showCut); // 裁切头像视图
app.get('/doCut',router.doCut); //裁切头像操作
app.post('/post',router.doPost); // 发表说说
app.get('/getAllPost',router.getAllPost); // 说说列表查询操作
app.get('/getUserInfo',router.getUserInfo); // 查询用户信息
app.get('/getshuoshuoamount',router.getshuoshuoamount); // 分页数据查询用户信息操作
app.get('/user/:username',router.showUser); // 个人主页视图
app.get('/userlist',router.showUserList); // 用户列表视图

app.listen(8081);