const crypto=require('crypto');

module.exports={

	// md5签名方法
	MD5_SUFFIX: 'a4QSL&*%$#@ISO029309_+梁6aoppf12sdXWAOPoam294985957%%^&&*(@&@(#&_$_($$_',
	md5(str){
		let obj=crypto.createHash('md5');
		obj.update(str);

		return obj.digest('hex');
	}
}