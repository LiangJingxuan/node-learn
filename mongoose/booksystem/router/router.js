const Book=require('../models/Book');
module.exports={

    // 列出所有图书，首页视图
    showIndex(req,res){
        Book.findBookList((err,list)=>{
            res.render('index',{
                'bookList': list
            })
        });
    },

    // 添加图书视图
    addbook(req,res){
        res.render('addbook')
    },

    // 添加图书操作
    doadd(req,res){

        Book.create(req.query,(err)=>{
            if(err){
                console.log(err);
            }
            res.send('保存成功！');
        });
    },

    // 修改图书视图
    edit(req,res){
        Book.findBookById(req.query.id,(err,book)=>{
            res.render('edit',{
                'name': book[0].name,
                'author': book[0].author,
                'price': book[0].price
            });
        });
    },

    // 修改图示操作
    doedit(req,res){

    }


};