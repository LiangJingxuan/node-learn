const app=require('express')();
const bodyParser=require('body-parser');

// 模板设置
app.set('view engine','ejs');

// body-parser设置
app.use(bodyParser.urlencoded({extended:false}));

// 表单路由
app.get('/',(req,res)=>{
    res.render('form');
});

// 登录操作
app.post('/login',(req,res)=>{
    res.send(req.body);
});


app.listen(8081);