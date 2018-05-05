const app=require('express')();

app.get('/user',(req,res)=>{

    console.log(req.query);

    res.send(req.query);

});

app.listen(8081);