/*
* 用户的操作
* */

const router=require('koa-router')();

router.get('/',(ctx)=>{
    ctx.body='用户的首页';
});

module.exports=router.routes();