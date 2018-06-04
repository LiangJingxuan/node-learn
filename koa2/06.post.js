const koa=require('koa');
const views=require('koa-views');
const bodyparser=require('koa-bodyparser');
const router=require('koa-router')();

const app=new koa();

// 配置模板引擎中间件
app.use(views('views',{extension: 'ejs'}));

// 配置bodyparser中间件
app.use(bodyparser());

router

    .get('/',async (ctx)=>{

        await ctx.render('post');
    })
    // post 提交数据处理
    .post('/dopost',async (ctx)=>{

        ctx.body=ctx.request.body;
    });


// 启动路由
app.use(router.routes()).use(router.allowedMethods());


app.listen(8081);