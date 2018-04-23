const Koa=require('koa');
const router=require('koa-router')();
const views=require('koa-views');
const boadyParser=require('koa-bodyparser');



const server=new Koa();

// 配置模板引擎第三方中间件
server.use(views('views',{
    extension: 'ejs'
}));

// 配置接收post数据第三方中间件
server.use(boadyParser());


router
    .get('/',async (ctx)=>{

        await ctx.render('form');
    })
    .post('/doUser',async (ctx)=>{

        console.log(ctx.request.body);
        ctx.body=ctx.request.body;
    });

server
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(8081);
