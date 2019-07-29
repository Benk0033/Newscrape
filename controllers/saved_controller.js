var db = require('../models');

// render articles in which saved = true onto saved.handlebars
exports.showSaved = function (req, res, next) {
    db.Article.find({ saved: true }).then(function (dbArticle) {

        var hbsSavedArticles = {
            savedArticles: dbArticle
        };

        res.render("saved", hbsSavedArticles);
    }).catch(function (err) {
        console.log(err);
    });
};

// clear all articles in which saved = true
exports.clearSavedArticles = function (req, res, next) {

    try {
        db.Article.deleteMany({ saved: true }, function (err, smth) {
            console.log(err)
            console.log(smth)
            res.send({ redirect: '/' })
        })
    } catch (e) {
        console.error(e)
    }
};

// delete one saved article
exports.deleteOneSaved = function (req, res, next) {

    db.Article.findOneAndDelete({ _id: req.params.id },
        function (err, smth) {
            console.log(err)
            console.log(smth)
            res.send({ redirect: '/' })
        });
};

// populate article with its associated comment
exports.findComment = function (req, res, next) {

    db.Article.findOne({ _id: req.params.id })
        .populate("comments")
        .then(function (dbArticle) {

            res.json(dbArticle)

        })
        .catch(function (err) {
            res.json(err)
        })

};

// post new comment, then update its associated article
exports.comment = function (req, res, next) {
    db.Comment.create(req.body)
        .then(function (dbComment) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComment._id } }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle)
        })
        .catch(function (err) {
            res.json(err)
        });
};

// deletes comment associated with article
exports.deleteComment = function (req, res, next) {

    db.Comment.findOneAndDelete({ _id: req.params.id },
        function (err, smth) {
            console.log(err)
            console.log(smth)
        }).then(function (dbComment) {
            res.json(dbComment)
        });

};