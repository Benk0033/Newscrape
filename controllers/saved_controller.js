var db = require('../models');

exports.save = function (req, res, next) {
    db.Article.find({ saved: true }).then(function (dbArticle) {

        var hbsSavedArticles = {
            savedArticles: dbArticle
        };

        // console.log(dbArticle);

        res.render("saved", hbsSavedArticles);
    }).catch(function (err) {
        console.log(err);
    });
};