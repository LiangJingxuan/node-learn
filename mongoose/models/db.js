const mongoose=require('mongoose');
const db=mongoose.createConnection('mongodb://127.0.0.1:27017/test');

db.once('open',()=>{
    console.log('数据库连接成功');
});

module.exports=db;