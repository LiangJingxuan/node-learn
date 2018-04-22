const url=require('url');

router={
    login(req,res){
        // console.log('login');
        res.write('login page route');
    },
    user(req,res){
        // console.log('user');
        // get请求 post请求 接收数据
        // console.log(req.method);
        if(req.method==='GET'){

            let get=url.parse(req.url,true).query;
            console.log(get);
            res.write('user');

        }else if(req.method==='POST'){

            let post='';
            req.on('data',(chunk)=>{
                post+=chunk;
            });
            req.on('end',(err,chunk)=>{
                console.log(post);
            });

        }else{
            res.write('user page route');
        }
    },
    home(req,res){
        // console.log('home');
        res.write('home page route');
    }
};
module.exports=router;