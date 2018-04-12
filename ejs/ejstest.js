const ejs=require('ejs');
const fs=require('fs');

ejs.renderFile(
	'./views/ejstest.ejs',
	{
		name: "ejs test name",
		user: [
			{name:'lee',pass:'123qwe'},
			{name:'amy',pass:'sko442'},
			{name:'blair',pass:'s4s4ds'},
			{name:'lisa',pass:'s7sd23'},
			{name:'anie',pass:'44sw2d'}
		],
		css: 'test2'
	},
	function(err,data){
		if(err){
			console.log(err);
		}else{
			fs.writeFile('./views/test.html',data,function(err,data){
				if(err){
					console.log(err);
				}else{
					console.log('success!');
				}
			});
		}
	}
);