require('dotenv').config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Load input validation.
const validateUserRegistration = require("../validation/register");
const validateUserLogin = require("../validation/login");

// Load User model.
const User = require("../models/user");

// @route POST users/register
// @desc User registration
// @access Public
router.post('/register', (request, response) => {
	// Check input validation.
	const { errors, isValid } = validateUserRegistration(request.body);
	if (!isValid) {
		return response.status(400).json(errors);
	}

	// Check if the email address is already associated with an acount.
	User.findOne({ email: request.body.email }).then((user) => {
		if (user) {
			return response.status(400).json({
				email: 'An account already exists with this email address.',
			});
		} else {
			const newUser = new User({
				firstName: request.body.firstName,
				lastName: request.body.lastName,
				email: request.body.email,
				password: request.body.password,
			});

			// Hash password before saving.
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
				  if (err) throw err;
				  newUser.password = hash;
				  newUser
					.save()
					.then(user => response.json(user))
					.catch(err => console.log(err));
				});
			  });
		}
	});
});

// @route POST users/login
// @desc User login
// @access Public
router.post('/login', (request, response) => {
	// Check input validation.
	const { errors, isValid } = validateUserLogin(request.body);
	if (!isValid) {
		return response.status(400).json(errors);
	}

	const email = request.body.email;
	const password = request.body.password;

	// Find the user account via the email address.
	User.findOne({ email }).then((user) => {
		// Check if the email address is associated with an acount.
		if (!user) {
			return response.status(404).json({
				emailnotfound: 'This email address is not associated with an account.',
			});
		}

		// An account exists for this email address. Check the password.
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// Create JWT payload.
				const payload = {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
				};

				// Create token signature.
				jwt.sign(
					payload,
					process.env.SECRET_OR_KEY.toString(),
					{
						// One month in seconds.
						expiresIn: 2629746
					},
					(error, token) => {
						response.json({
							success: true,
							token: 'Bearer ' + token,
						});
					}
				);
			} else {
				return response
					.status(400)
					.json({ passwordincorrect: 'The password provided is incorrect.' });
			}
		});
	});
});

module.exports = router;
