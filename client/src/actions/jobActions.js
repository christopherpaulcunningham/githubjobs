import axios from 'axios';
import { GET_ERRORS, SET_JOBS, SET_CURRENT_JOB, LOAD_MORE_JOBS } from './types';

export const getJobsList = (data) => {
	return async (dispatch) => {
		await axios
			.post('/jobs/jobsList', data)
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

export const getJobById = (id) => {
	return async (dispatch) => {
		await axios
			.post('/jobs/jobById', id)
			.then((res) => {
				return dispatch(setCurrentJob(res.data));
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
	type: SET_JOBS,
	payload: data,
});

export const setCurrentJob = (data) => ({
	type: SET_CURRENT_JOB,
	payload: data,
});

export const setLoadMoreJobs = (data) => ({
	type: LOAD_MORE_JOBS,
	payload: data,
});
