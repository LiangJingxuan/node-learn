const express=require('express');
const cookie=require('cookie-parser');

const app=express();
app.use(cookie());

app.get('/',(req,res)=>{
    res.cookie('xihao','tfboys',{maxAge:90000,httpOnly:true});
    res.send(req.cookies);
});

app.listen(8081);