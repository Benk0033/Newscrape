var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/index_controller')

router.get('/', index_controller.showArticles);

router.get('/scrape', index_controller.scrape);

router.delete('/clear', index_controller.clearArticles);

router.put('/api/saved/:id', index_controller.save);

module.exports = router;
