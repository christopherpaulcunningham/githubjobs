import { SET_JOBS, SET_CURRENT_JOB, LOAD_MORE_JOBS } from '../actions/types';

const initialState = {
	jobList: {},
	currentJob: {},
};

const jobReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_JOBS:
			return {
				...state,
				jobList: action.payload,
			};
		case SET_CURRENT_JOB:
			return {
				...state,
				currentJob: action.payload,
			};
		case LOAD_MORE_JOBS:
			return [...state, ...action.payload];
		default:
			return state;
	}
};

export default jobReducer;
