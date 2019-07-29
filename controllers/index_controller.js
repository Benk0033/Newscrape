var db = require("../models")
var axios = require('axios');
var cheerio = require('cheerio');

// function to scrape new articles from Yahoo
exports.scrape = function (req, res, next) {
    axios.get("https://www.yahoo.com").then(function (response) {

        var $ = cheerio.load(response.data);

        $("li[data-type='article']").find("div.strm-headline").each(function (i, element) {

            // variable to store headline, summary, and url from scraped articles
            var result = {};

            result.headline = $(this).find(".js-content-title").text();
            result.summary = $(this).find("p").text();
            result.url = $(this).find("a").attr("href");
            result.saved = false;

            // only update db with unique articles
            db.Article.update(result, { $setOnInsert: result }, { upsert: true }).then(function (newArticle) {
                console.log(newArticle);
            }).catch(function (err) {
                console.log(err);

            });
        });
        res.redirect("/")
    });
};

// displays articles in which saved = false
exports.showArticles = function (req, res, next) {

    db.Article.find({ saved: false }).then(function (dbArticle) {

        // create handlebars object
        var hbsArticles = {
            articles: dbArticle
        };

        // render handlebars object into index.handlebars
        res.render("index", hbsArticles);
    }).catch(function (err) {
        console.log(err);
    });
};

// clear all articles in which saved = false
exports.clearArticles = function (req, res, next) {

    try {
        db.Article.deleteMany({ saved: false }, function (err, smth) {
            console.log(err)
            console.log(smth)
            res.send({ redirect: '/' })
        });
    } catch (e) {
        console.error(e)
    };
};

// save article
exports.save = function (req, res, next) {
    db.Article.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            saved: req.body.saved
        }, function (err, smth) {
            console.log(err)
            console.log(smth)
            res.send({ redirect: '/' })
        });
};