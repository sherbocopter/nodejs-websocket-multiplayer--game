var express = require('express');
var router = express.Router();

module.exports = function(passport) {
	/* GET sign up page. */
	router.get('/', function(req, res) {
		res.render('signup', { message: req.flash('signupMessage') });
	});

	router.post('/', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	return router;
};