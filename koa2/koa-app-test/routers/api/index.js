const router=require('koa-router')();
const add=require('./add');

router.use('/add',add);

module.exports=router.routes();