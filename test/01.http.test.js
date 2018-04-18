const HTTP=require('http');

HTTP.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});
    res.write('success!');
    res.end();
}).listen(8081);