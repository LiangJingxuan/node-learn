const crypto=require('crypto');
module.exports=function(pwd){
    let md5=crypto.createHash('md5');
    return md5.update(pwd).digest('base64');
};