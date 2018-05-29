const mongoose=require('mongoose');
const mongoId=require('mongodb').ObjectID;
const db=require('./db');

// 创建数据结构
const bookSchema=new mongoose.Schema({
    name: {type: String},
    author: {type: String},
    price: {type: Number},
    type: {type: Array, 'default': ['']}
});

// 查找图书列表
bookSchema.statics.findBookList=function(callback){
    this.model('Book').find({},callback);
};

// 根据id查找图书信息
bookSchema.statics.findBookById=function(id,callback){
    this.model('Book').find({'_id': mongoId(id)},callback);
};


// 创建数据模型
const BookModel=db.model('Book',bookSchema);

module.exports=BookModel;