const koa=require('koa');
const session=require('koa-session');
const router=require('koa-router')();

const app=new koa();

// 配置session中间件
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: true
};

app.use(session(CONFIG, app));


router

    .get('/',async (ctx)=>{

        // 添加session
        ctx.session.user='梁景轩';

        ctx.body='session test ...'

    })
    .get('/news',async (ctx)=>{

        // 读取session
        let user=ctx.session.user;
        console.log(user);

        ctx.body='session test ...'
    });


// 启动路由
app.use(router.routes()).use(router.allowedMethods());


app.listen(8081);