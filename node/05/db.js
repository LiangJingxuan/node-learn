// 这个模块封装了所有对数据库的常用操作
const MongoClient=require('mongodb').MongoClient;
const setting=require('./settings');

//不管数据库什么操作，都是先连接数据库，所以我们可以把连接数据库
//封装成为内部函数
function _connectDB(callback){
    const url=setting.dbUrl; // 从setting文件中读取数据库地址
    MongoClient.connect(url,(err,db)=>{
        callback(err,db);
    });
}

// 插入数据
exports.insertOne=function(collectionName,JSON,callback){
    _connectDB((err,db)=>{
        if(err){callback(err,null);db.close();return}
        db.collection(collectionName).insertOne(JSON,(err,result)=>{
            callback(err,result);
            db.close();
        })
    })
};

// 查找数据
exports.find=function(collectionName,JSON,C,D){
    let result=[], callback, skipnumber, limit, args, sort;
    if(arguments.length===3){
        callback=C;
        skipnumber=0; // 应该省略的条数
        limit=0; // 数目限制
    }else if(arguments.length===4){
        callback=D;
        args=C;
        skipnumber=args.pageamout*args.page || 0; // 应该省略的条数
        limit=args.pageamout || 0; // 数目限制
        sort=args.sort || {} ;// 排序方式
    }else{
        throw new Error('find action arguments length is three or four!');
    }

    // 查找
    _connectDB((err,db)=>{
        const cursor=db.collection(collectionName).find(JSON).skip(skipnumber).limit(limit).sort(sort);
        cursor.each((e,doc)=>{
            if(e){callback(err,null);db.close(); return}
            if(doc!==null){
                result.push(doc); // 放入结果数组
            }else{
                // 遍历结束 没有更多文档了
                callback(null,result);
                db.close();
            }
        });
    })

};

// 删除数据
exports.deleteMany=function(collectionName,JSON,callback){
    _connectDB((err,db)=>{
        db.collection(collectionName).deleteMany(
            JSON,(e,results)=>{
                callback(e,results);
                db.close();
            }
        );
    })
};

// 修改数据
exports.updateMany=function(collectionName,JSON1,JSON2,callback){
    _connectDB((err,db)=>{
        db.collection(collectionName).updateMany(
            JSON1,JSON2,(err,results)=>{
                callback(err,results);
                db.close();
            }
        );
    })

};

// 统计
exports.getAllCount=function(collectionName,callback){
    _connectDB((err,db)=>{
        db.collection(collectionName).count({}).then((count)=>{
            callback(count);
            db.close();
        });
    })
};