function User(){
    this.name='lee';
    this.age=20;
}
User.prototype={
    say(){
        return this.name+'..'+this.age;
    }
};

module.exports=User;