import { SET_JOBS, LOAD_MORE_JOBS } from '../actions/types';

const initialState = {};

const jobReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_JOBS:
			return action.payload;
		case LOAD_MORE_JOBS:
			return [...state, ...action.payload];
		default:
			return state;
	}
};

export default jobReducer;
