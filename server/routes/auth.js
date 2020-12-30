const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

router.post('/login', (req, res, next) => {
	// Check if user is already logged in
	if (!req.user) {
		//See if there is a user with this email
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) {
				return res.status(404).send({ message: 'An error has occured please try again.' });
			}

			if (!user) {
				return res.status(404).send({ message: 'The email you have entered does not exist.' });
			}

			passport.authenticate('local', (err, user, info) => {
				if (err) {
					return res.status(404).send({ message: 'Password or email is incorrect.' });
				}

				req.logIn(user, (err) => {
					if (err) return res.status(404).send({ message: 'Password or email is incorrect.' });

					console.log('User signed in : ' + user);
					return res.send(user);
				});
			})(req, res, next);
		});
	} else {
		return res.status(404).send({ message: 'You are already logged in.' });
	}
});

router.post('/register', (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) return res.status(404).send({ message: 'An error has occured please try again.' });

		if (user) {
			return res.status(400).send({ message: 'A user with this email already exists!' });
		}

		passport.authenticate('local', (err, user, info) => {
			if (err) return res.status(400).send({ message: 'An error has occured please try again' });
			req.logIn(user, (err) => {
				if (err) {
					return res.status(400).send({ message: 'An error has occured please try again' });
				}

				return res.status(200).send({ message: 'Logged in.' });
			});
		})(req, res, next);
	});
});

router.post('/logout', (req, res, next) => {
	req.logout();
	console.log('Logout');
	return res.sendStatus(200);
});

router.get('/current_user', (req, res) => {
	return res.send(req.user);
});

router.get('/is_user_logged_in', (req, res) => {
	if (req.user == null) return res.send(false);

	if (req.user == undefined) return res.send(false);

	if (Object.keys(req.user).length == 0) return res.send(false);

	return res.send(true);
});

router.post('/make_user_admin', (req, res) => {
	if (req.user == null) return res.send('You must be logged in');

	User.findOne({ email: req.user.email }, (err, user) => {
		if (err) {
			return res.send('An error occured');
		}

		user.isAdmin = !user.isAdmin;
		user.save();

		return res.send(user);
	});
});
module.exports = router;
