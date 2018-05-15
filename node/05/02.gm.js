const fs=require('fs');
const gm=require('gm');

// 缩略图制作
gm('./public/user.png').resize(20,20).write('./public/user2.png',(err)=>{
    if(err){
        console.log(err);
    }
});

// 裁切图片
// crop() 前两个参数是宽高，后两个是坐标
gm('./public/user.png').crop(15,15,15,15).write('./public/user3.png',(err)=>{
    if(err){
        console.log(err);
    }
});