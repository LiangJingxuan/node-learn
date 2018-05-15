const express=require('express');
const formidable=require('formidable');
const ObjectID=require('mongodb').ObjectID;
const db=require('./db');

const app=express();

app.set('view engine','ejs');
app.use(express.static('./public'));

// 查询留言
app.get('/',(req,res)=>{
    db.getAllCount('liuyanban',(count)=>{
        res.render('index',{
            'pageamonut':Math.ceil(count/3)
        });
    });
});

// 提交留言
app.post('/tijiao',(req,res)=>{
    const form=new formidable.IncomingForm();
    form.parse(req,(err,fields)=>{
        // 写入数据库
        db.insertOne('liuyanban',{
            'xingming':fields.xingming,
            'liuyan':fields.liuyan,
            'shijian':new Date()
        },(err,result)=>{
            if(err){
                res.json(false);
                return;
            }
            res.json(true);
        })
    })

});

// 查询留言
app.get('/du',(req,res)=>{
    const page=parseInt(req.query.page);
    const pagesize=parseInt(req.query.pagesize);
    db.find('liuyanban',{},{'sort':{'shijian':-1},'pageamout':pagesize,'page':page},(err,result)=>{
        if(err){
            res.json(err);
            return;
        }
        res.json(result);
    })
});

// 删除留言
app.get('/shanchu',(req,res)=>{
    let id=req.query.id;
    db.deleteMany('liuyanban',{'_id':ObjectID(id)},(err,result)=>{
        res.json(true);
    })
});


app.listen(8081);