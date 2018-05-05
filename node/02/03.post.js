const http=require('http');
const url=require('url');
const querystring=require('querystring');

http.createServer((req,res)=>{

    let pathname=url.parse(req.url).pathname;

    if(pathname==='/dologin' && req.method.toLowerCase()==='post'){

        let PostData='';
        req.on('data',(chunk)=>{
            PostData+=chunk;
        });
        req.on('end',()=>{
            let loginData=querystring.parse(PostData);
            console.log(loginData);
        });

        res.end();
    }

}).listen(80);