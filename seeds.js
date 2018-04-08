var mongoose = require('mongoose');
var Comment = require("./models/comments");


Campground  = require("./models/campground");


var defaultData = [
    {
        name: "Clouds Rest",
        image: "https://pixabay.com/get/e83db30820f7033ed1584d05fb1d4e97e07ee3d21cac104497f3c07da7ebb5ba_340.jpg",
        description: "Where the cat lies"
    },
    {
        name: "Clouds Peak",
        image: "https://pixabay.com/get/e83db30820f7033ed1584d05fb1d4e97e07ee3d21cac104497f3c07da7ebb5ba_340.jpg",
        description: "Where the cat lies very high"
    },
    {
        name: "Max's Rest",
        image: "https://pixabay.com/get/e83db30820f7033ed1584d05fb1d4e97e07ee3d21cac104497f3c07da7ebb5ba_340.jpg",
        description: "Where the dog barks"
    },
    
]

function SeedDB() {
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Removed Campgrounds");

            defaultData.forEach(function(seed){
                Campground.create(seed, function(err, data) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Created Data");

                        Comment.create({
                            text: "This place is AMAZZZIIING",
                            author: "Homor Simpson"
                        }, function(err, comment){
                            if(err) {
                                console.log(err);
                            } else {
                                data.comments.push(comment._id)
                                data.save();
                            }
                        });


                    }
                });
            });
        }
    });
}

module.exports = SeedDB;
