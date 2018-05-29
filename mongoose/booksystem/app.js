const express=require('express');
const router=require('./router/router');
const app=express();

app.set('view engine','ejs');

app.get('/',router.showIndex); // 列出所有图书，首页视图
app.get('/addbook',router.addbook); // 添加图书视图
app.get('/doadd',router.doadd); // 添加图书操作
app.get('/edit',router.edit); // 修改图书视图
app.get('/doedit',router.doedit); // 修改图书操作


app.listen(8081);