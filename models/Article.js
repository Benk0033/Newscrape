var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    headline: {
        type: String,
        required: true,
        unique: true
    },

    summary: {
        type: String,
        required: true,
        unique: true
    },

    url: {
        type: String,
        required: true,
        unique: true
    },

    saved: {
        type: Boolean,
        required: true,
        default: false
    },

    // this needs to be an array of objects so each article can have many comments
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]

});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;