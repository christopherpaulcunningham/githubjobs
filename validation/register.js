const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateUserRegistration(data) {
	let errors = {};

	// Convert empty fields to an empty string in order to use validator functions.
	data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
	data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	// First and last name validation.
	if (Validator.isEmpty(data.firstName)) {
		errors.registerFirstName = 'Please enter a first name.';
	}
	if (Validator.isEmpty(data.lastName)) {
		errors.registerLastName = 'Please enter a last name.';
	}

	// Email address validation.
	if (Validator.isEmpty(data.email)) {
		errors.registerEmail = 'Please enter an email address.';
	} else if (!Validator.isEmail(data.email)) {
		errors.registerEmail = 'Please enter a valid email address.';
	}

	// Password validation.
	if (Validator.isEmpty(data.password)) {
		errors.registerPassword = 'Please enter a password.';
	} else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.registerPassword = 'Password must be between 6 & 30 characters long.';
		errors.registerPassword2 = 'Password must be between 6 & 30 characters long.';
	}
	if (Validator.isEmpty(data.password2)) {
		errors.registerPassword2 = 'Please confirm your password.';
	} else if (!Validator.equals(data.password, data.password2)) {
		errors.registerPassword2 = 'Passwords must match.';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
