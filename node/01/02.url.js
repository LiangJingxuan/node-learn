const http=require('http');
const url=require('url');

http.createServer((req,res)=>{

    let path=url.parse(req.url).pathname;
    let s=url.parse(req.url,true).query;

    console.log(path);

    console.log(s);

    res.end();

}).listen(3000,'127.0.0.1');