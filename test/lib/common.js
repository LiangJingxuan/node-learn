const common={
    getMime(extname){
        switch (extname){
            case '.html':
                return 'text/html';
            case  '.css':
                return 'text/css';
            case '.js':
                return 'text/javascript';
            default:
                return 'text/html';
        }
    },
    getMimeAll(fs,Emitter,extname){
        fs.readFile('./mime.json','utf8',(err,data)=>{
            if(err){
                console.log('mime.json文件不存在');
            }else{
                const Mimes=JSON.parse(data);
                const ext=Mimes[extname] || 'text/html';
                Emitter.emit('emitter',ext);
            }
        });
    }
};
module.exports=common;