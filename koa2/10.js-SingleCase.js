/*
*  es6 单例的实现：每次只调用一次构造函数中的方法
*
* */

class Db{

    // 静态方法实现单例
    static Instance(){

        if(!Db.instance){
            Db.instance=new Db();
        }
        return Db.instance;
    }

    constructor(){
        console.log('实例化构造函数');
        this.connect();
    }
    connect(){
        console.log('连接数据库');
    }
    find(){
        console.log('查询数据库...');
    }

}

let studentDb=Db.Instance();
let tencherDb=Db.Instance();

console.log(tencherDb);

studentDb.find();
tencherDb.find();