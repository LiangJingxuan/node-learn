const http=require('http');
const url=require('url');

http.createServer((req,res)=>{
    if(req.url!=='/favicon.ico'){

        let path=url.parse(req.url).pathname;
        console.log(path);

        switch (path){
            case '/index':
                res.write('index page');
                break;
            case '/user':
                res.write('user page');
                break;
            case '/admin':
                res.write('admin page');
                break;
            default:
                res.write('login');
        }
    }
    res.end();
}).listen(8081);