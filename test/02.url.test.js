const HTTP=require('http');
const URL=require('url');

HTTP.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});
    // res.write('success!');

    if(req.url!=='/favicon.ico'){
        // console.log(req.url);
        let u=URL.parse(req.url,true);
        console.log(u.query.id);
        console.log(u.query.token);
        res.write('supervisor use : "supervisor <file name> "')
    }

    res.end();

}).listen(8081);