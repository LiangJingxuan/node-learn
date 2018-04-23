const Koa=require('koa');
const router=require('koa-router')();
const art=require('koa-art-template');
const path=require('path');



const server=new Koa();

// 配置模板引擎art第三方中间件
art(server,{
    root: path.join(__dirname,'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !=='production'
});


router
    .get('/',async (ctx)=>{

        await ctx.render('index',{
            name: 'lee',
            age: 24,
            work: 'code'
        });


    });

server
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(8081);
