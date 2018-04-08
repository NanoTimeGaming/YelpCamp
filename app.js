var express     = require("express"),
    app         = express(), 
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comments"),
    SeedDB      = require("./seeds");



mongoose.connect("mongodb://localhost/yelp_camp");

SeedDB();

// Schema Setup







app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var objectCampground = {name: name, image: image, description: desc};
    // Create new campground and save to database
    Campground.create(objectCampground, function(err, newlyCreatedCamp){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    //res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCamp);
            res.render("show", {campground: foundCamp});
        }
        
    });   
})

app.listen(3000, function(){
    console.log('YelpCamp-Server Has Started!');
});