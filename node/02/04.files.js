const http=require('http');
const url=require('url');
const formidable=require('formidable');
const fs=require('fs');
const path=require('path');

http.createServer((req,res)=>{

    let pathname=url.parse(req.url).pathname;

    if(pathname==='/dologin' && req.method.toLowerCase()==='post'){

        let from=new formidable.IncomingForm;
        from.uploadDir='./uploads';

        from.parse(req,(err,fields,files)=>{
            if(err)throw err;

            // console.log(fields);
            // console.log(files);

            // 文件改名
            let extname=path.extname(files.UserPic.name);
            let oldname=__dirname+'/'+files.UserPic.path;
            let newname=__dirname+'/uploads/'+new Date().getTime()+'_'+Math.random()*89999 + 10000+extname;
            fs.rename(oldname,newname,(err,data)=>{
                if(err)throw err;
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                res.end('ok...');
            });
        })



    }

}).listen(80);