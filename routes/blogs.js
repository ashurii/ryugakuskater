var express     = require("express");
var router      = express.Router( );
var Blog        = require("../models/blog")

router.get("/", function(req, res){
     Blog.find({}, function(err, blogs){
        if(err){
            console.log(err)
        }else{
            res.render("home", {blogs: blogs})
        }
    })
    
})
router.get("/newblog", function(req, res){
    res.render("newblog");
})

router.post("/blogs", function(req, res){
    var title   = req.body.title;
    var content = req.body.content;
    var image   = req.body.image;
    var video   = req.body.video;
    var author  = req.body.author;
    
    var newBlog = {title: title, content: content, image: image, author: author, video: video}
    
    // Create a new blogpost and save it to the database
    Blog.create(newBlog, function(err, newlyCreated){
        if(err){
            console.log(err)
        }else{
            console.log(newlyCreated);
            res.redirect("/archive");
        }
    })
})

router.get("/archive", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err)
        }else{
            res.render("archive", {blogs: blogs})
        }
    })
})
// SHOW ROUTE
router.get("/archive/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/archive")
        } else{
            res.render("show", {blog: foundBlog});
        }
    })
})

router.delete("/archive/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/archive")
        }else{
            res.redirect("/archive");
        }
    })
})


module.exports = router;

