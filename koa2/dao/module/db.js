/*DB库封装*/
const MongoClient=require('mongodb').MongoClient;
const db=require('./config');

class Db{

    constructor(){
        this.connect(); // 初始化时调用连接数据库方法
    };

    // 连接
    connect(){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(db.dbUrl,(err,client)=>{
                if(err){
                    reject(err);
                }else{
                    const data=client.db(db.dbName);
                    resolve(data);
                }
            })
        })
    };

    // 查找
    find(collectionName,json){
        return new Promise((resolve, reject) =>{
            this.connect().then((db)=>{
                const list=db.collection(collectionName).find(json);
                list.toArray((err,docs)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(docs);
                    }
                });
            });
        })
    };

    // 更新
    update(){

    };

    // 插入
    insert(){

    };
}

// 使用
const myDb=new Db();

myDb.find('user',{}).then((data)=>{
    console.log(data)
});
