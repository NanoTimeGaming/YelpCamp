
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);


//Adding a new cat to database!

// var Max = new Cat({
//     name: "Catty",
//     age: 11,
//     temperament: "Suprisngly Nice"
// })

// Max.save(function(err, cat) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Saved Cat with Name: " + cat.name);
//     }
// });

Cat.create({
    name: 'Snow Black',
    age: 20,
    temperament: "Strong"
}, function(err,cat){
    if(err) {
        console.log(err);
    } else {
        console.log("Yay And the name of the cat is: " + cat.name);
    }
});

//Retrieve all cats from database!

// Cat.find({},function(err, cats){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(cats);
//     }
// });