/*
* 增加的操作
* */
const router=require('koa-router')();

router.get('/',(ctx)=>{
    ctx.body='增加的首页';
});

module.exports=router.routes();