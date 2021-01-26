import axios from 'axios';
import { GET_ERRORS } from './types';

export const getJobsList = (data) => {
	return async (dispatch) => {
		await axios
			.post('/jobs/jobs', data)
			.then((res) => {
				return dispatch(setJobs(res.data));
			})
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				})
			);
	};
};

export const setJobs = (data) => ({
	type: 'SET_JOBS',
	payload: data,
});

export const setLoadMoreJobs = (data) => ({
	type: 'LOAD_MORE_JOBS',
	payload: data,
});
