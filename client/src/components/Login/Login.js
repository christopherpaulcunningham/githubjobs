import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

import InputField from '../shared/InputField/InputField';
import './Login.css';

function Login() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const errors = useSelector((state) => state.errors);
	const dispatch = useDispatch();
	const history = useHistory();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		// If logged in and user navigates to Login page, should redirect them to dashboard.
		if (isAuthenticated) {
			history.push('/dashboard');
		}
	}, [isAuthenticated, history]);

	const onChange = (evt) => {
		setFormData({ ...formData, [evt.target.id]: evt.target.value });
	};

	const onSubmit = (evt) => {
		evt.preventDefault();

		// Log the user in.
		const userData = {
			email: formData.email,
			password: formData.password,
		};

		dispatch(loginUser(userData));
	};

	return (
		<div className="login-container">
			<div className="auth-container">
				<div className="left-column">
					<div className="auth-header">
						<h2>Sign in</h2>
					</div>
					<div className="auth-form">
						<form noValidate onSubmit={onSubmit}>
							<div className="input-group">
								<InputField
									id="email"
									value={formData.email}
									error={errors.loginEmail, errors.emailnotfound}
									type="email"
									placeholder="Email"
									className={classnames('', {
										invalid: errors.loginEmail || errors.emailnotfound,
									})}
									onChange={onChange}
								/>
							</div>
							<div className="input-group">
								<InputField
									id="password"
									value={formData.password}
									error={errors.loginPassword, errors.passwordincorrect}
									type="password"
									placeholder="Password"
									className={classnames('', {
										invalid: errors.loginPassword || errors.passwordincorrect,
									})}
									onChange={onChange}
								/>
							</div>
							<div className="button-group">
								<button type="submit" className="button submit-button">
									Sign in
								</button>
								<Link to="/register">
									<button className="button alt-button">Sign up</button>
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

export default Login;
