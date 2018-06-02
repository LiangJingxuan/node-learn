const mongoose=require('mongoose');

// 创建数据结构
const studentSchema=new mongoose.Schema({
    sid: Number,
    name: String,
    sex: String,
    age: Number,
    curriculum: [Number] // 存放课程的cid
});
studentSchema.index({sid:1}); // 设置索引

// 创建数据库
const Student=mongoose.model('Student',studentSchema);

module.exports=Student;

