const koa=require('koa');
const router=require('koa-router')();
const admin=require('./routers/admin/index');
const api=require('./routers/api/index');

const app=new koa();

router.use('/admin', admin);
router.use('/api', api);

app.use(router.routes()).use(router.allowedMethods());

app.listen(8081);
