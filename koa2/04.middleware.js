const koa=require('koa');
const router=require('koa-router')();

const app=new koa();

// ********错误级中间件：
app.use(async (ctx,next)=>{

    console.log(4444);

    await next();

    if(ctx.status===404){
        ctx.body='not fond ...'
    }else{
        console.log(ctx.url);
    }
});

// ********应用级中间件：
// 需求：在访问任何路由时都打印出当前时间
app.use(async (ctx,next)=>{

    console.log(new Date());

    await next(); // 当前路由匹配完成后继续向下匹配

    console.log(2333);
});

// 设置路由
router

    .get('/',async (ctx)=>{

        console.log('index...');

        ctx.body=ctx.query;
    })

    // ********路由级中间件：
    .get('/news',async (ctx,next)=>{
        console.log('233 news ...');
        await next();
    })
    .get('/news',async (ctx)=>{

        ctx.body='新闻列表';

    });


// 启动路由
app.use(router.routes()).use(router.allowedMethods());


app.listen(8081);