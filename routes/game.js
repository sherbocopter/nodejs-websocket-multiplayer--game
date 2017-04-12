var express = require('express');
var router = express.Router();
var checkNested = require('../functions/check_nested');

router.get('/', function(req, res, next) {
	if (!checkNested(req, 'session', 'passport', 'user'))
		res.redirect('/index');
	else
		res.render('game');
});

module.exports = router;