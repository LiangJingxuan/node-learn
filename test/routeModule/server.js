const http=require('http');
const url=require('url');
const router=require('./router');

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});
    const path=url.parse(req.url).pathname.replace('/','');
    // console.log(path);

    if(path!=='favicon.ico'){

        try {
            router[path](req,res);

        }catch (err){
            console.log(err);
            router['home'](req,res);
        }
    }

    res.end();
}).listen(8081);