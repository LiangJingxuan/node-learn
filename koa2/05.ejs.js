const koa=require('koa');
const views=require('koa-views');
const router=require('koa-router')();

const app=new koa();

// 配置模板引擎中间件
// app.use(views('views',{map:{html:'ejs'}}));
app.use(views('views',{extension: 'ejs'}));

// 设置公共模板引擎数据
app.use(async (ctx,next)=>{

    ctx.state.username='梁景轩';

    await next();
});

router

    .get('/',async (ctx)=>{

        // 输出模板
        await ctx.render('index',{
            test: 'hello koa ...'
        });
    });


// 启动路由
app.use(router.routes()).use(router.allowedMethods());


app.listen(8081);