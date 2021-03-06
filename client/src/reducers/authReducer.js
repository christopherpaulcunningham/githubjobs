import { SET_CURRENT_USER, USER_LOADING, SET_USER_FAVOURITES } from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
	isAuthenticated: false,
	user: {},
	loading: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case USER_LOADING:
			return {
				...state,
				loading: true,
			};
		case SET_USER_FAVOURITES:
			return {
				...state,
				user: {
					...state.user,
					favourites: action.payload,
				},
			};
		default:
			return state;
	}
};

export default authReducer;
