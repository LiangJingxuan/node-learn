const http=require('http');
const fs=require('fs');

http.createServer((req,res)=>{

    // 忽略图标请求
    if(req.url==='/favicon.ico')return;

    // 读取文件夹内的所有内容
    fs.readdir('./',(err,files)=>{
        if(err){
            throw err;
        }
        // console.log(files);

        let dirs=[];
        (function iterator(i){
            // 结束条件
            if(i===files.length){
                // 结束检测 输出数组
                console.log(dirs);
                return;
            }
            // 进行检测
            fs.stat('./'+files[i],(e,stats)=>{
                if(e){
                    throw e;
                }
                // 检测文件夹成功后放到数组中
                if(stats.isDirectory()){
                    dirs.push(files[i]);
                }
                iterator(++i);
            });

            // console.log(i);
        })(0)
    });


    res.end();



}).listen(8080);