const router=require('koa-router')();
const user=require('./user');
const goods=require('./goods');

router.use('/user',user);
router.use('/goods',goods);

module.exports=router.routes();