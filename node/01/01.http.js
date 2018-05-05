const http=require('http');
const fs=require('fs');

http.createServer((req,res)=>{

    console.log(req.url);

    if(req.url==='/home'){
        fs.readFile('./static/index.html',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                res.end(data);
            }
        })
    }else if(req.url==='/node.css'){
        fs.readFile('./static/style.css',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.writeHead(200,{'Content-Type':'text/css;charset=utf-8'});
                res.end(data);
            }
        })
    }else if(req.url==='/node.jpg'){
        fs.readFile('./static/003.jpg',(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.writeHead(200,{'Content-Type':'image/jpg'});
                res.end(data);
            }
        })
    }else{
        res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
        res.end('您访问的页面不存在');
    }

}).listen(3000);