const MongoClient=require('mongodb').MongoClient;
const dbUrl='mongodb://127.0.0.1:27017/';
const dbName='koa-test';

// 连接数据库
MongoClient.connect(dbUrl,(err,client)=>{

    if(err){
        console.log(err);
        return;
    }
    const db=client.db(dbName);

    // 增加数据
    /*db.collection('user').insertOne({
        username: 'blair',
        age: 21,
        sex: '女',
        status: 1
    },(err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
        client.close();

    });*/

    // 查询数据
    let item=db.collection('user').find({});
    item.toArray((err,list)=>{
        console.log(list);
    });
});