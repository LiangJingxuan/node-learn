const Route={
    index(req,res){

        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write('首页');
    },
    user(req,res){

        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write('用户');
    },
    notFond(req,res){

        res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
        res.write('页面不存在');
    }
};

module.exports=Route;