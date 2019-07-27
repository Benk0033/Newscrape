var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/index_controller')

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', index_controller.showArticles);

router.get('/scrape', index_controller.scrape);

router.get('/clear', index_controller.clearArticles);

router.put('/api/saved', index_controller.save);

module.exports = router;
