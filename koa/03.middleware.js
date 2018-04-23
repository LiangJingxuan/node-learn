const Koa=require('koa');
const router=require('koa-router')();

const server=new Koa();

// 中间件

// 应用级中间件 匹配路由之前打印日期
server.use(async (ctx,next)=>{
    console.log(new Date());
    await next();

    // 错误级中间件
    if(ctx.status===404){
        ctx.status=404;
        ctx.body='404';
    }else{
        console.log(ctx.url);
    }
});

// 设置路由
router
    // 路由级中间件 继续向下匹配路由
    .get('/',async (ctx,next)=>{

        ctx.body='首页';

        await next();
    })
    .get('/user/:id',async (ctx)=>{

        // console.log(ctx.query); // 获取get传值

        // console.log(ctx.params); // 获取动态路由

        ctx.body='用户页';
    });

// 开启路由
server
    .use(router.routes())
    .use(router.allowedMethods());

// 设置端口
server.listen(8081);