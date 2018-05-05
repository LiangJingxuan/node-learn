const http=require('http');
const fs=require('fs');
const path=require('path');
const url=require('url');

http.createServer((req,res)=>{

    // 过滤图标请求
    if(req.url==='/favicon.ico')return;

    // 读取静态文件
    let pathname=url.parse(req.url).pathname;
    if(pathname==='/')pathname='/index.html';

    // 拓展名获取
    let extname=path.extname(pathname);

    fs.readFile('./static'+pathname,(err,data)=>{
        if(err){
            // 静态文件不存在显示404
            fs.readFile('./static/404.html',(e,d)=>{
                if(e)throw e;
                res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
                res.end(d);
            });
            return;
        }
        extpath(extname,(ext)=>{
            res.writeHead(200,{'Content-Type':ext+';charset=utf-8'});
            res.end(data);
        });
    });

}).listen(8080);

function extpath(ext,callback){
    fs.readFile('./mime.json',(e,d)=>{
        if(e)throw e;
        let mime=JSON.parse(d)[ext] || 'text/plain';
        callback(mime);
    });
}