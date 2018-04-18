const foo={
    name:'module',
    toDo(){
        return this.name;
    },
    add(x,y){
        return x+y;
    }
};
module.exports=foo;