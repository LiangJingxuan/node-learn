const express = require('express');

const server = express();

// 路由
const userRouter = express.Router();
server.use('/user',userRouter);
userRouter.get('/user.html',function(req,res){
	res.send('user router test..');
});

server.listen(8081);