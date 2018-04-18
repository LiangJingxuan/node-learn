const fs=require('fs');

// 1. 检测文件与目录
fs.stat('01.http.test.js',(err,stats)=>{
    if(err){
        console.log(err);
    }else{
        console.log('文件:'+stats.isFile());
        console.log('目录:'+stats.isDirectory());
    }
});

// 2. 创建目录
fs.mkdir('fs.test.1',(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('success!');
    }
});

// 3. 创建与写入文件
fs.writeFile('./fs.test.1/test.txt',new Date().getDay(),'utf8',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('success!');
    }
});

// 4. 追加文件
fs.appendFile('t.txt','错误日志...\n','utf8',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('success!');
    }
});

// 5. 读取文件
fs.readFile('t.txt','utf8',(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

// 6. 读取目录, 把目录下文件和目录都读取到
fs.readdir('www',(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

// 7. 重命名
fs.rename('t.txt','test.txt',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('success!');
    }
});

// 8. 删除目录
fs.rmdir('i',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('success!');
    }
});

// 9. 删除文件
fs.unlink('i.txt',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('success!');
    }
});
