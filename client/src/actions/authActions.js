import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
	GET_ERRORS,
	SET_CURRENT_USER,
	USER_LOADING,
	SET_USER_FAVOURITES,
} from './types';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/users/register', userData)
		.then((res) => {
			// Redirect to login page.
			history.push('/login');

			// Reset any errors.
			dispatch({
				type: GET_ERRORS,
				payload: {},
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/users/login', userData)
		.then((res) => {
			// Save to localStorage.
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));

			// Reset any errors.
			dispatch({
				type: GET_ERRORS,
				payload: {},
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const addFavouritePost = (data) => (dispatch) => {
	axios
		.put('/users/favourites/save', data)
		.then((res) => {
			// Set user favourites.
			dispatch(setUserFavourites(res.data));
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const removeFavouritePost = (data) => (dispatch) => {
	axios
		.delete('/users/favourites/delete', { data: data })
		.then((res) => {
			// Set user favourites.
			dispatch(setUserFavourites(res.data));

			// Toggle the 'isFavourite' property of the current job.
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const getLatestUserRecord = (decoded) => (dispatch) => {
	let userInfo = decoded;

	axios.post('/users/getLatestUserRecord', {id:userInfo.id}).then((res) => {
		userInfo.favourites = res.data.favourites;

		// Set user favourites.
		dispatch(setCurrentUser(userInfo));
	})
}

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	};
};

// Set user favourites.
export const setUserFavourites = (data) => {
	return {
		type: SET_USER_FAVOURITES,
		payload: data,
	};
};

// Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
