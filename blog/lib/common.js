// 时间格式设置
function toDou(n){
	return n<10?'0'+n:''+n;
};

module.exports={
	// 解析时间戳，已秒为单位
	timeData(timestamp){
		let D=new Date();
		D.setTime(timestamp*1000);

		return D.getFullYear()+'-'+toDou(D.getMonth()+1)+'-'+toDou(D.getDate())+' '+
		toDou(D.getHours())+':'+toDou(D.getMinutes())+':'+toDou(D.getSeconds()); 
	}
};