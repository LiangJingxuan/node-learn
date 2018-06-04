// Promise 使用
const p=new Promise((resolve,reject)=>{
    setTimeout(function(){
        let a=true;
        resolve(a);
    },0);
});

p.then((res)=>{
   // console.log(res);
});


// async方法使用
async function getData(){
    return 1;
}
let res=getData();
// console.log(res);

// 使用await获取async中的数据
async function test(){
    let res=await getData();
    console.log(res);
}
test();


