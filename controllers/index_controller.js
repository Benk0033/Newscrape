var db = require("../models")
var axios = require('axios');
var cheerio = require('cheerio');

// function to scrape new articles from Yahoo
exports.scrape = function (req, res, next) {
    axios.get("https://www.yahoo.com").then(function (response) {

        var $ = cheerio.load(response.data);

        $(".stream-item-title").each(function (i, element) {

            // variable to store headline, summary, and url from scraped articles

            var headline = $(element).children("a").children("span").text();
            var summary = $(element).siblings("p").text();
            var url = "https://www.yahoo.com" + $(element).children("a").attr("href");

            if (headline && summary && url) {

                db.Article.insertMany({
                    headline: headline,
                    summary: summary,
                    url: url,
                    save: false
                }).catch(function (err) {
                    console.log(err);

                })


            }

        });
        res.redirect("/")
    });
};

// displays articles in which saved = false
exports.showArticles = function (req, res, next) {

    db.Article.find({ saved: false }).lean().then(function (dbArticle) {

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