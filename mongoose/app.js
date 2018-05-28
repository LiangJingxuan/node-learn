const db=require('./models/db');
const Student=require('./models/Student');

// 创建数据-方法一
/****
const amy=new Student({name:'amy',age:23,sex:'female'});
amy.save(()=>{
    console.log('数据存储成功');
});
****/

// 创建数据-方法二
/****
Student.create({name: 'blair',age: 21,sex: 'female'},(err)=>{
    console.log('保存成功');
});
****/

// 查找
Student.findStudent('amy',(err,res)=>{
    console.log(res);
});

// 修改
Student.updateStudent({name:'amy'},{$set: {age:20}},{},()=>{
    console.log('修改成功');
});