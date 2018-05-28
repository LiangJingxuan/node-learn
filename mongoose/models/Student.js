const mongoose=require('mongoose');
const db=require('./db');
const studentSchema=new mongoose.Schema({
    name: {type: String},
    age: {type: Number},
    sex: {type: String}
});

// 创建静态方法-查找
studentSchema.statics.findStudent=function(name,callback){
    return this.model('Student').find({name:name},callback);
};

// 创建静态方法-修改
studentSchema.statics.updateStudent=function(conditions,update,options,callback){
    this.model('Student').update(conditions,update,options,callback);
};



const StudentModel=db.model('Student',studentSchema);
module.exports=StudentModel;