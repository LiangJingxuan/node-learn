/*
* 产品的操作
* */
const router=require('koa-router')();

router.get('/',(ctx)=>{
    ctx.body='产品的首页';
});

module.exports=router.routes();