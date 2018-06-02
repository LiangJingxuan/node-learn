const mongoose=require('mongoose');

// 创建数据结构
const curriculumSchema=new mongoose.Schema({
    cid: Number,
    name: String,
    students: [Number]
});
curriculumSchema.index({cid:1}); // 设置索引

// 添加学生
curriculumSchema.statics.addSeudentData=function(kidArray,sid,callback){
    for(let i=0,len=kidArray.length;i<len;i++){
        Curriculum.update({kid:kidArray[i]},{$push: {students: sid}},()=>{
            console.log('课程添加报名学生成功！');
        });
    }
};

// 创建数据库
const Curriculum=mongoose.model('Curriculum',curriculumSchema);

module.exports=Curriculum;

