import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

import InputField from '../shared/InputField/InputField';
import './Register.css';

function Register() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const errors = useSelector((state) => state.errors);
	const dispatch = useDispatch();
	const history = useHistory();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
	});

	useEffect(() => {
		// If logged in and user navigates to Register page, redirect to dashboard.
		if (isAuthenticated) {
			history.push('/dashboard');
		}
	}, [isAuthenticated, history]);

	const onChange = (evt) => {
		console.log(formData);
		setFormData({ ...formData, [evt.target.id]: evt.target.value });
	};

	const onSubmit = (evt) => {
		evt.preventDefault();

		const userData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
			password2: formData.password2,
		};

		dispatch(registerUser(userData, history));
	};

	return (
		<div className="register-container">
			<div className="auth-container">
				<div className="left-column">
					<div className="auth-header">
						<h2>Create Account</h2>
					</div>
					<div className="auth-form">
						<form noValidate onSubmit={onSubmit}>
							<div className="input-group">
								<InputField
									id="firstName"
									value={formData.firstName}
									error={errors.registerFirstName}
									type="text"
									placeholder="First Name"
									className={classnames('', {
										invalid: errors.registerFirstName,
									})}
									onChange={onChange}
								/>
							</div>
							<div className="input-group">
								<InputField
									id="lastName"
									value={formData.lastName}
									error={errors.registerLastName}
									type="text"
									placeholder="Last Name"
									className={classnames('', {
										invalid: errors.registerLastName,
									})}
									onChange={onChange}
								/>
							</div>
							<div className="input-group">
								<InputField
									id="email"
									value={formData.email}
									error={errors.registerEmail}
									type="email"
									placeholder="Email"
									className={classnames('', {
										invalid: errors.registerEmail,
									})}
									onChange={onChange}
								/>
							</div>
							<div className="input-group">
								<InputField
									id="password"
									value={formData.Password}
									error={errors.registerPassword}
									type="password"
									placeholder="Password"
									className={classnames('', {
										invalid: errors.registerPassword,
									})}
									onChange={onChange}
								/>
							</div>
							<div className="input-group">
								<InputField
									id="password2"
									value={formData.password2}
									error={errors.registerPassword2}
									type="password"
									placeholder="Confirm Password"
									className={classnames('', {
										invalid: errors.registerPassword2,
									})}
									onChange={onChange}
								/>
							</div>
							<div className="button-group">
								<button type="submit" className="button submit-button">
									Sign up
								</button>
								<Link to="/login">
									<button className="button alt-button">Sign in</button>
								</Link>
							</div>
						</form>
					</div>
				</div>
				<div className="right-column">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</div>
			</div>
		</div>
	);
}

export default Register;
