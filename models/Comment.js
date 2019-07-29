var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

    body: String,

    saved: {
        type: Boolean,
        default: false
    },

});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;