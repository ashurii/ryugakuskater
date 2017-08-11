var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: {type: String, default: "http://i.imgur.com/DV1xgRd.jpg"},
    video: String,
    created: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
    
});

module.exports = mongoose.model("blog", blogSchema);