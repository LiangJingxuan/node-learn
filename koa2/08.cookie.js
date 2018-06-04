const koa=require('koa');
const router=require('koa-router')();

const app=new koa();


router

    .get('/',async (ctx)=>{

        // 设置cookie
        /*ctx.cookies.set('username','liang',{
            maxAge: 60*1000*60,
            httpOnly: true // true表示只有服务器端可以访问
        });*/

        // 设置中文cookie
        let u=new Buffer('梁景轩').toString('base64');
        ctx.cookies.set('u',u,{
            maxAge: 60*1000*60,
            httpOnly: true
        });

        ctx.body='cookie test ...'

    })
    .get('/news',async (ctx)=>{

        // 读取cookie
        // let username=ctx.cookies.get('username');

        // 读取中文cookie
        let username=ctx.cookies.get('u');
        let u=new Buffer(username,'base64').toString();
        console.log(u);

        ctx.body='cookie test ...'
    });


// 启动路由
app.use(router.routes()).use(router.allowedMethods());


app.listen(8081);