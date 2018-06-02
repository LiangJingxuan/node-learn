const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Student');

const db=mongoose.connection;
db.once('open',(callback)=>{
    console.log('数据库连接成功！');
});

module.exports=db;