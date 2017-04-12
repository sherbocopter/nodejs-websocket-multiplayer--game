var express = require('express');
var router = express.Router();

module.exports = function(passport) {
	router.get('/', function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	});

	router.post('/', passport.authenticate('local-login', {
		successRedirect: '/menu',
		failureRedirect: '/login',
		failureFlash: true
	}));

	return router;
};