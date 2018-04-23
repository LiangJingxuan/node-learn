const Koa=require('koa');
const router=require('koa-router')();
const views=require('koa-views');
const staticSource=require('koa-static');



const server=new Koa();

// 配置模板引擎第三方中间件
server.use(views('views',{
    extension: 'ejs'
}));

// 配置静态资源处理第三方中间件
server.use(staticSource(__dirname+'/views'));

router
    .get('/',async (ctx)=>{

        await ctx.render('static');
    });

server
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(8081);
