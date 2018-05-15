const express=require('express');
const mongo=require('mongodb').MongoClient;

const app=express();

app.get('/',(req,res)=>{

    // url就是数据库的地址 test表示数据库,如果数据库不存在将会自动创建。
    let url='mongodb://127.0.0.1:27017/test';
    mongo.connect(url,(err,db)=>{
        if(err){console.log('数据库连接失败');return}
        // console.log('数据库连接成功.');

        // 插入数据,  选择一个集合 集合不存在会自动创建
        db.collection('user').insertOne({

            "name":"amy",
            "age":parseInt(Math.random()*100+10),
            "sex":"女"

        },(err,result)=>{

            // 插入之后做的事情，res表示插入的结果比如说影响行数
            // console.log(result);
            res.send(result);

            // 关闭数据库
            db.close();
        });
    });
});

app.listen(8081);