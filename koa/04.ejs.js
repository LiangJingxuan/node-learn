const Koa=require('koa');
const router=require('koa-router')();
const views=require('koa-views');

const server=new Koa();

// 配置模板引擎第三方中间件
server.use(views('views',{
    extension: 'ejs'
}));

// 在应用级中间件中写公共模板引擎需要加载的信息
server.use(async (ctx,next)=>{
    ctx.state.user={
        name: 'lee',
        age: 24,
        work: 'code'
    };
    await next(); // 继续向下匹配
});

router
    .get('/',async (ctx)=>{
        // ctx.body='首页';
        let title='hello ejs!',
            item=[1,2,3,4,5,6,7,8,9,0];
        await ctx.render('index',{
            title,
            item
        });
    })
    .get('/user',async (ctx)=>{
        ctx.body='用户';
    });

server
    .use(router.routes())
    .use(router.allowedMethods());



server.listen(8081);
