const express=require('express');
const session=require('express-session');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);

let userData=[];

app.set('view engine','ejs'); // 设置模板

// 设置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// 首页登录
app.get('/',(req,res)=>{
    res.render('index');
});

// 确认登录 检查此人是否有用户名并且用户名不能重复
app.get('/check',(req,res)=>{
    const user=req.query.user;
    if(!user){
        res.send('请登录！');
        return;
    }
    if(userData.indexOf(user)!==-1){
        res.send('用户名被占用！');
        return;
    }
    userData.push(user); // 添加用户

    // 写入session
    req.session.user=user;
    res.redirect('/chat');

});

// 聊天室
app.get('/chat',(req,res)=>{
    res.render('chat');
});
io.on('connection',(socket)=>{
    socket.on('msg',(msg)=>{
        io.emit('io',msg);
    });
});



http.listen(8081);