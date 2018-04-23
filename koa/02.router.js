const Koa=require('koa');
const router=require('koa-router')();

const app=new Koa();

// 配置路由
router
    .get('/',async (ctx)=>{
        ctx.body='首页';
    })
    .get('/user',async (ctx)=>{

        // 获取get传值
        console.log(ctx.query);

        ctx.body='用户'
    })
    // 动态路由
    .get('/news/:id',async (ctx)=>{

        // 获取动态路由
        console.log(ctx.params);

        ctx.body='新闻';

    });

// 启动路由
app
    .use(router.routes())
    .use(router.allowedMethods());



app.listen(8081);