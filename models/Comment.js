var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

    body: String,

    saved: {
        type: Boolean,
        default: false
    },

});

CommentSchema.methods.saveComment = function (params) {
    this.saved = true;
    return this.saved;
};

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;