const express=require('express');
const db=require('./db');

const app=express();

app.get('/',(req,res)=>{

    // 插入数据
    db.insertOne('user',{

        "name":"blair",
        "age":parseInt(Math.random()*100+10),
        "sex":"女"

    },(err,result)=>{

        if(err) res.send('插入失败');

        res.send(result);

    })

});

app.get('/find',(req,res)=>{

    // 这个页面现在接受一个page参数
    let page=parseInt(req.query.page); // express读取get配置

    db.find('user',{"age":{$gt:18}},{"pageamout":2,"page":page},(err,result)=>{

        res.json({"result":result});
    })


});

app.get('/delete',(req,res)=>{

    // 删除数据
    let id=parseInt(req.query.id);
    db.deleteMany("user",{"age":id},(err,results)=>{
        res.json(results);
    });
});

app.get('/update',(req,res)=>{
    db.updateMany("user",{"name":"blair"},{
        $set:{"age":22}

    },(err,results)=>{
        if(err){
            console.log(err);
        }
        res.json(results);
    })
});

app.listen(8081);