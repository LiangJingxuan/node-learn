const koa=require('koa');
const router=require('koa-router')();

const app=new koa();

// 设置路由
router

    // get方式传值
    .get('/',async (ctx)=>{

        console.log(ctx.request);

        ctx.body=ctx.query;
    })

    // 动态路由
    .get('/news',async (ctx)=>{

        ctx.body='新闻列表';

    })
    .get('/news/:id',async (ctx)=>{

        // 获取动态路由的传值
        ctx.body=ctx.params;

    });



// 启动路由
app.use(router.routes()).use(router.allowedMethods());


app.listen(8081);