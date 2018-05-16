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


app.listen(8081);