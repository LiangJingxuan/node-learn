const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Cat=mongoose.model('Cat',{name: String});

const kitty=new Cat({name: 'Zildjian'});
kitty.save().then(() => console.log('meow'));

const tom=new Cat({name: 'Tom'});
tom.save().then(()=>{console.log('meow')});