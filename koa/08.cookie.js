const Koa=require('koa');
const router=require('koa-router')();



const server=new Koa();


router
    .get('/',async (ctx)=>{

        // 设置cookie
        ctx.cookies.set('userInfo','lee',{
            maxAge: 60*1000*60,

            // true 表示这个cookie只有服务器可以访问，false表示客户端js和服务器都可以访问
            httpOnly:true
        });

        // 设置中文cookie方法
        let user=new Buffer('梁景').toString('base64');
        ctx.cookies.set('user',user,{
            maxAge: 1000*60*60,
            httpOnly: true
        });

        ctx.body='首页';

    })
    .get('/user',async (ctx)=>{
        // 读取cookie
        let u=ctx.cookies.get('userInfo');
        console.log(u);

        // 读取中文cookie
        let ud=ctx.cookies.get('user');
        let user=new Buffer(ud,'base64').toString();
        console.log(user);

        ctx.body='用户';
    });

server
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(8081);
