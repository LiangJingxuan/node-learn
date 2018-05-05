const http=require('http');
const Router=require('./module/Route');

http.createServer((req,res)=>{

    if(req.url==='/'){
        Router.index(req,res);
    }else if(req.url==='/user'){
        Router.user(req,res);
    }else{
        Router.notFond(req,res);
    }

    res.end();

}).listen(8080);