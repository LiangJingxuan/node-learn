// 利用HTTP模块 URl模块 Path模块 Fs模块创建一个静态WEB服务器
const HTTP=require('http');
const URL=require('url');
const PATH=require('path');
const FS=require('fs');
const events=require('events');

const COMMON=require('./lib/common');

// console.log(COMMON.getMimeAll(FS, '.css'));

// 创建事件驱动
const Emitter=new events.EventEmitter();

//  创建服务
HTTP.createServer((req,res)=>{
    let pathname=URL.parse(req.url).pathname;
    // console.log(pathname);

    if(pathname==='/'){
        pathname='/index.html'; // 默认加载首页
    }

    // 获取文件后缀名
    let extname=PATH.extname(pathname);

    // 文件操作 获取static下面的index.html
    if(pathname!=='/favicon.ico'){

        FS.readFile('static/'+pathname,(err,data)=>{
            if(err){
                // 没有相应文件
                FS.readFile('static/404.html',(e,d)=>{
                    if(e){
                        // 没有相应文件
                        console.log(e);
                    }
                    res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
                    res.write(d);
                    res.end(); // 结束响应
                })
            }else{
                // 有响应文件, 返回
                // let mime=COMMON.getMime(extname);

                COMMON.getMimeAll(FS,Emitter,extname);
                Emitter.on('emitter',(mime)=>{
                    res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
                    // res.write(data);
                    res.end(data); /*结束响应*/
                });
            }
        })

    }

}).listen(8081);