const koa=require('koa');

const app=new koa;

//  中间件
app.use(async (ctx)=>{
    ctx.body='hello koa!';
});

app.listen(3000);