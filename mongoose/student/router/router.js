const Student=require('../models/Student');
const Curriculum=require('../models/Curriculum');

/* 创建课程数据
Curriculum.create({cid:27,name:'语文'});
Curriculum.create({cid:14,name:'数学'});
Curriculum.create({cid:9,name:'英语'});*/

module.exports={

    // 学生列表视图
    studentItems(req,res){
        // 查找所有学生
        Student.find({},(err,items)=>{
            res.render('index',{items});
        });
    },

    // 新增学生视图
    addStudentView(req,res){
        // 查找全部课程
        Curriculum.find({},(err,curriculum)=>{
            res.render('addStudent',{curriculum});
        });
    },

    // 新增学生操作
    doAddStudentAct(req,res){
        // 新增添加学生信息
        Student.create(req.query,(err,studentOnes)=>{
            res.send(studentOnes);

            // 在课程中添加此人
            Curriculum.addSeudentData(req.query.curriculum,req.query.sid,(err,data)=>{
                res.send('添加成功！');
            });
        });
    },

    // 修改学生视图
    editStudentView(req,res){
        const sid=parseInt(req.params['sid']);
        Student.findOne({'sid':sid},(err,data)=>{
            if(err || !data){
                res.send('信息不存在！');
                return;
            }
            // 查找全部课程
            Curriculum.find({},(err,curriculum)=>{
                res.render('editStudent',{data,curriculum});
            });
        });
    },

    // 修改学生操作
    doEditStudentAct(req,res){
        const sid=parseInt(req.query.sid);
        Student.update({sid:sid},req.query,(err,data)=>{
            res.send('修改成功!');
        });
    },

    // 删除学生操作
    removeStudentAct(req,res){
        const sid=parseInt(req.params['sid']);
        Student.remove({sid:sid},(err,data)=>{
            res.send('删除成功!');
        });
    }
};