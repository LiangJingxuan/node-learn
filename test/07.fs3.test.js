const fs=require('fs');

// 流的方式读取
let t='', count=0;
const readStream=fs.createReadStream('fs.txt');
readStream.on('data',(chunk)=>{
    t+=chunk;
    count++;
});

// 读取完成
readStream.on('end',(chunk)=>{
    console.log(t);
    console.log(count);
});

// 读取失败
readStream.on('error',(err)=>{
    console.log(err);
});



// 流的方式写入
let txt='nodejsnodejsnodejsnodejsnodejsnodejsnodejsnodejs\n';
const writeStrem=fs.createWriteStream('output.txt');

for(var i=0;i<100;i++){
    writeStrem.write(txt,'utf8');
}

writeStrem.write(txt,'utf8');

// 标记写入完成
writeStrem.end();

writeStrem.on('finish',()=>{
    console.log('写入完成');
});

// 写入失败
writeStrem.on('error',()=>{
    console.log('写入失败');
});

