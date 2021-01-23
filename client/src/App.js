import React from 'react';
import { useDispatch } from 'react-redux';
import {
	useHistory,
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
	const dispatch = useDispatch();
	const history = useHistory();

	// Check for JWT token to keep the user logged in.
	if (localStorage.jwtToken) {
		// Set authentication token header.
		const token = localStorage.jwtToken;
		setAuthToken(token);

		// Decode the token and get user info.
		const decoded = jwt_decode(token);

		// Set user and isAuthenticated
		dispatch(setCurrentUser(decoded));

		// Check for an expired token.
		const currentTime = Date.now() / 1000; // Time in milliseconds
		if (decoded.exp < currentTime) {
			// Logout.
			dispatch(logoutUser());

			// Redirect to login.
			history.push('/login');
		}
	}

	return (
		<Router>
			<div className="App">
				<Navbar />
				<Route exact path="/" component={Homepage} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Switch>
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
