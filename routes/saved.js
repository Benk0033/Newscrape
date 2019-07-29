var express = require('express');
var router = express.Router();

var saved_controller = require('../controllers/saved_controller')

/* GET users listing. */
router.get('/', saved_controller.showSaved);

router.get('/api/comments/:id', saved_controller.findComment);

router.post('/api/comments/:id', saved_controller.comment);

router.delete('/clearSaved', saved_controller.clearSavedArticles);

router.delete('/api/saved/:id', saved_controller.deleteOneSaved);

router.delete('/api/comments/:id', saved_controller.deleteComment);

module.exports = router;
