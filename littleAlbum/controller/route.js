const file=require('../models/file');
const formidable=require('formidable');
const path=require('path');
const fs=require('fs');


// 首页
exports.showIndex=function showIndex(req,res,next){
    file.getAllAlbums(function(err,allAlabums){
        if(err){next(); return}
        res.render('index',{
            "albums": allAlabums
        });
    })
};

// 相册
exports.showAlbum=function showAlbum(req,res,next){
  let albumName=req.params.albumName;
  file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
      if(err){next(); return}
      res.render('album',{
          "albumname": albumName,
          "images": imagesArray
      });
  });
};

// 显示上传
exports.showUp=function showUp(req,res){
    file.getAllAlbums(function(err,allAlabums){
        if(err){next(); return}
        res.render('up',{
            "albums": allAlabums
        });
    })

};

// 上传文件
exports.doPost=function doPost(req,res){
    let form=new formidable.IncomingForm();
    // 传到缓存文件夹中
    form.uploadDir=path.normalize(__dirname+'/../setup/');
    form.parse(req,function(err,fields,files,next){
        // console.log(fields);
        // console.log(files);

        if(err){next(); return}

        // 判断文件大小
        let size=parseInt(files.tupian.size);
        console.log(size);
        if(size>204800){
            res.send('图片大小不能超过2M');
            // 删除图片
            fs.unlink(files.tupian.path,function(){});
            return;
        }

        // 改名及修改路径到uploads文件夹中
        let oldpath=files.tupian.path;
        let newpath=path.normalize(__dirname+'/../uploads/'+fields.wenjianjia+'/'+
            new Date().getTime()+'_'+Math.random()+path.extname(files.tupian.name));
        fs.rename(oldpath,newpath,function(err){
            if(err){
                console.log(err);res.send('改名失败！');return}
            res.send('操作成功！');
        })
    });
};
