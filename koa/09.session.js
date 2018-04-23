const Koa=require('koa');
const router=require('koa-router')();
const session=require('koa-session');



const server=new Koa();

// 配置session外部中间件
server.keys=['some secret hurr']; // cookie签名
const CONFIG={
    key: 'koa:sess', // cookie签名
    maxAge: 86400000, // cookie过期时间
    overwrite: true, // 默认true 没有效果
    httpOnly: true, // true表示只有服务器端可以获取
    signed: true, // 默认签名
    rolling: false, // 每次访问都重置时间
    renew: true // 访问快要到期时重置时间
};
server.use(session(CONFIG,server));



router
    .get('/',async (ctx)=>{

        // 设置session
        ctx.session.userData='梁景';

        ctx.body='首页';

    })
    .get('/user',async (ctx)=>{

        // 读取session
        console.log(ctx.session.userData);

        ctx.body='用户';
    });

server
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(8081);
