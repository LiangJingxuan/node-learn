const express=require('express');

module.exports=function(){
	let router=express.Router();

	router.get('/',(req,res)=>{
		res.send('im web').end();
	});


	return router;
}