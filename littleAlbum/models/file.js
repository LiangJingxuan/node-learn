const fs=require('fs');

// 读取文件夹
exports.getAllAlbums=function(callback){
    fs.readdir('./uploads',(err,files)=>{
        if(err){callback('没有找到uploads文件夹',null);return}
        let allAlbums=[];
        (function iterator(i){
            if(i===files.length){
                callback(null,allAlbums);
                return;
            }
            fs.stat('./uploads/'+files[i],(err,stats)=>{
                if(err) callback('找不到文件：'+files[i],null);
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);
    });
};

// 通过文件夹名读取图片文件
exports.getAllImagesByAlbumName=function(albumName,callback){
    fs.readdir('./uploads/'+albumName,(err,files)=>{
        if(err){callback('没有找到uploads文件夹',null);return}
        let allImages=[];
        (function iterator(i){
            if(i===files.length){
                callback(null,allImages);
                return;
            }
            fs.stat('./uploads/'+albumName+'/'+files[i],(err,stats)=>{
                if(err) callback('找不到文件：'+files[i],null);
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);
    });
};