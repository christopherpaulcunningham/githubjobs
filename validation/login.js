const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserLogin(data) {
	let errors = {};

	// Convert empty fields to an empty string in order to use validator functions.
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	// Email address validation.
	if (Validator.isEmpty(data.email)) {
		
		errors.loginEmail = 'Please enter an email address.';
	} else if (!Validator.isEmail(data.email)) {
		errors.loginEmail = 'Please enter a valid email address.';
	}

	// Password validation.
	if (Validator.isEmpty(data.password)) {
		errors.loginPassword = 'Please enter a password.';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
