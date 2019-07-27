var express = require('express');
var router = express.Router();

var saved_controller = require('../controllers/saved_controller')

/* GET users listing. */
router.get('/', saved_controller.save);

module.exports = router;
