const Koa=require('koa');
const router=require('koa-router')();

const app=new Koa();

// 配置路由
router
    .get('/',async (ctx)=>{
        ctx.body='koa test ...';
    })
    .get('/news',async (ctx)=>{
        ctx.body='news test ...';
    });

// 启动路由
app
    .use(router.routes())
    .use(router.allowedMethods());



app.listen(8081);