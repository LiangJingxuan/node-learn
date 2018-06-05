/*DB库封装*/
const MongoClient=require('mongodb').MongoClient;
const db=require('./config');

class Db{

    // 单例：保证一个类仅有一个实例
    static Instance(){
        if(!Db.instance){
            Db.instance=new Db();
        }
        return Db.instance;
    };

    constructor(){
        this.dbClient=null; // 放置db对象-保证只执行一次数据库连接
        this.connect(); // 实例化时执行数据库连接
    };

    // 连接
    connect(){
        return new Promise((resolve, reject)=>{
            if(!this.dbClient){ // 保证只执行一次数据库连接
                MongoClient.connect(db.dbUrl,(err,client)=>{
                    if(err){
                        reject(err);
                    }else{
                        this.dbClient=client.db(db.dbName);
                        resolve(this.dbClient);
                    }
                })
            }else{
                resolve(this.dbClient);
            }
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

module.exports=Db.Instance();