const koa=require('koa');
const views=require('koa-views');
const statics=require('koa-static');
const router=require('koa-router')();

const app=new koa();

// 配置模板引擎中间件
app.use(views('views',{extension: 'ejs'}));

// 配置静态资源中间件
app.use(statics('static'));

router

    .get('/',async (ctx)=>{

        await ctx.render('test');

    });


// 启动路由
app.use(router.routes()).use(router.allowedMethods());


app.listen(8081);