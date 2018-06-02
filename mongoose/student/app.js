const express=require('express');
const router=require('./router/router');
const db=require('./models/db');

const app=express();

app.set('view engine','ejs');

app.get('/',router.studentItems); // 学生列表视图
app.get('/addStudent',router.addStudentView); // 新增学生视图
app.get('/doAddStudent',router.doAddStudentAct); // 新增学生操作
app.get('/editStudent/:sid',router.editStudentView); // 修改学生视图
app.get('/doEditStudent',router.doEditStudentAct); // 修改学生操作
app.get('/removeStudent/:sid',router.removeStudentAct); // 删除学生操作

app.listen(8081);