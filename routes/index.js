var express = require('express');
var router = express.Router();
var checkNested = require('../functions/check_nested');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!checkNested(req, 'session', 'passport', 'user'))
		res.render('index', { title: 'Simple RPG' });
	else
		res.redirect('/menu');
});

module.exports = router;