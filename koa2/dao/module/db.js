/*DB库封装*/
const MongoBD=require('mongodb');
const MongoClient=MongoBD.MongoClient;
const ObjectID=MongoBD.ObjectID;

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
    find(collectionName,JSON){
        return new Promise((resolve, reject) =>{
            this.connect().then((db)=>{
                const list=db.collection(collectionName).find(JSON);
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
    update(collectionName,originJSON,freshJSON){
        return new Promise((resolve, reject) =>{
            this.connect().then((db)=>{
                db.collection(collectionName).updateOne(originJSON,{
                    $set: freshJSON
                },(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        })
    };

    // 插入
    insert(collectionName,JSON){
        return new Promise((resolve, reject) =>{
            this.connect().then((db)=>{
                db.collection(collectionName).insertOne(JSON,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                });
            });
        })
    };

    // 删除
    remove(collectionName,JSON){
        return new Promise((resolve, reject) =>{
            this.connect().then((db)=>{
                db.collection(collectionName).removeOne(JSON,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            });
        })
    };

    // 通过id查找
    getObjectId(id){
        return new ObjectID(id);
    }
}

module.exports=Db.Instance();

let mongo=Db.Instance();

// 添加
/*mongo.insert('user',{username:'amy',age:23,sex:'女',status:1}).then((data)=>{
    console.log(data);
});*/

// 更新
/*mongo.update('user',{username:'amy'},{status:2}).then((data)=>{
    console.log(data);
});*/

// 删除
/*mongo.remove('user',{username:'amy'}).then((data)=>{
    console.log(data);
});*/

// 查找

/*mongo.find('user',{_id: mongo.getObjectId('5b155392edb6e71dd4c93e1f')}).then((data)=>{
    console.log(data);
});*/