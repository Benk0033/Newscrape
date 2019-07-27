var db = require("../models")
var axios = require('axios');
var cheerio = require('cheerio');

exports.scrape = function (req, res, next) {
    axios.get("https://www.yahoo.com").then(function (response) {

        var $ = cheerio.load(response.data);

        $("li[data-type='article']").find("div.strm-headline").each(function (i, element) {

            var result = {};

            result.headline = $(this).find(".js-content-title").text();
            result.summary = $(this).find("p").text();
            result.url = $(this).find("a").attr("href");
            result.saved = false;

            // console.log(result);

            db.Article.update(result, { $setOnInsert: result }, { upsert: true }).then(function (newArticle) {
                console.log(newArticle);
            }).catch(function (err) {
                console.log(err);

            });
        });
        // res.send("scrape complete")
        res.redirect("/")
    });
};

exports.showArticles = function (req, res, next) {

    db.Article.find({ saved: false }).then(function (dbArticle) {

        var hbsArticles = {
            articles: dbArticle
        };

        // console.log(dbArticle);

        res.render("index", hbsArticles);
    }).catch(function (err) {
        console.log(err);
    });
};

exports.clearArticles = function (req, res, next) {

    // db.Article.find({}).then(function (dbArticle) {

    // dbArticle[0].saved = true;
    // console.log(dbArticle[0]);

    try {
        db.Article.deleteMany({ "saved": false }, function (err, smth) {
            console.log(err)
            console.log(smth)
        })
    } catch (e) {
        console.error(e)
    }

    res.redirect("/")
    // })
}

exports.save = function (req, res, next) {
    db.Article.saveArticle
}