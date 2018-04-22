const fs=require('fs');

// 判断服务器上有没有upload目录，没有则创建：
fs.stat('upload',(err)=>{
    if(err){
        fs.mkdir('upload',(e)=>{
            if(e){
                console.log(e);
            }else{
                console.log('创建成功');
            }
        })
    }else{
        console.log('目录已存在');
    }
});


// 找出html下面所有目录，然后打印出来
fs.readdir('upload',function(err,files){
    if(err){
        console.log(err);
    }else{
        // console.log(files);
        for(let i=0;i<files.length;i++){
            // console.log(files[i]);
            fs.stat('upload/'+files[i],function(err,stats){
                if(stats.isDirectory()){
                    console.log(files[i]);
                }
            })
        }
    }
});