const url=require('url');
const expressRouterModule=function(){

    const G=this;
    this._get={};
    this._post={};

    const app=function(req,res){
        // console.log(req);
        res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});

        // 获取路由
        let path=url.parse(req.url).pathname;
        // 获取请求方式
        let method=req.method.toLowerCase();

        if(G['_'+method][path]){
            if(method==='post'){
                // 执行post请求
                let postData='';
                res.on('data',function(chunk){
                    postData+=chunk;
                });
                res.on('end',function(err,chunk){
                    req.body=postData;
                    G['_'+method][path](req,res);
                });
            }else{
                // 执行get请求
                G['_'+method][path](req,res);
            }
        }else{
            res.end('路由不存在!');
        }
    };

    // get 方法
    app.get=function(string,callback){
        G._get[string]=callback;
    };

    // post 方法
    app.post=function(string,callback){
        G._post[string]=callback;
    };


    return app;
};
module.exports=expressRouterModule();