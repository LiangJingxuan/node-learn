const express=require('express');
const route=require('./controller');

const app=express();

// 模板引擎设置
app.set('view engine','ejs');

// 静态文件设置
app.use(express.static('./public'));
app.use(express.static('./uploads'));

// 首页
app.get('/',route.showIndex);

// 相册
app.get('/:albumName',route.showAlbum);

// 显示上传
app.get('/up',route.showUp);

// 上传文件
app.post('/up',route.doPost);

// 404
app.use((req,res)=>{
    res.status(404).render('err');
});

// 端口
app.listen(8081);