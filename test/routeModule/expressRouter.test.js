const http=require('http');
const url=require('url');
const G={};

const app=function(req,res){

    res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});

    let path=url.parse(req.url).pathname;
    // console.log(path);

    if(!path.endsWith('/'))path+='/';

    // console.log(path);

    if(G[path]){
        G[path](req,res);
    }else{
        res.write('路由不存在');
        res.end();
    }

};
app.get=function(string,callback){

    if(!string.endsWith('/'))string+='/';
    if(!string.startsWith('/'))string='/'+string;

    // console.log(string);

    G[string]=callback;
};

http.createServer(app).listen(3000);

app.get('login',function(req,res){
    res.write('login');
    res.end();
});
app.get('user',function(req,res){
    res.write('user');
    res.end();
});