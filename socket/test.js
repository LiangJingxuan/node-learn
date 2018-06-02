const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{

    // 显示首页
    if(req.url==='/' || req.url==='/index.html'){
        fs.readFile('./index.html',(err,data)=>{
            res.end(data);
        })
    }
});

// 创建一个io对象
const io=require('socket.io')(server);

// 监听一个连接事件
io.on('connection',(socket)=>{

    socket.on('say',(msg)=>{
        socket.emit('bb',msg);
    });

});

server.listen(8081);