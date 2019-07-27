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

    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }

});

ArticleSchema.methods.saveArticle = function (params) {
    this.saved = true;
    return this.saved;
};

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;