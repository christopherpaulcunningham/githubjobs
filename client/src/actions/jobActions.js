import axios from 'axios';
import { GET_ERRORS, SET_JOBS, SET_CURRENT_JOB, TOGGLE_IS_FAVOURITE, LOAD_MORE_JOBS } from './types';

export const getJobsList = (data, isLoadMore) => async (dispatch) => {
	try {
		const res = await axios.post('/jobs/jobsList', data);

		if (isLoadMore) {
			return dispatch(setLoadMoreJobs(res.data));
		} else {
			return dispatch(setJobs(res.data));
		}		
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data,
		});
	}
};

export const getJobById = (data) => {
	return async (dispatch) => {
		await axios
			.post('/jobs/jobById', data)
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

export const saveJobPost = (userId, jobId) => {
	return async (dispatch) => {
		await axios
			.post('/jobs/saveJobPost', userId, jobId)
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

export const toggleIsFavourite = () => ({
	type: TOGGLE_IS_FAVOURITE
});

export const setLoadMoreJobs = (data) => ({
	type: LOAD_MORE_JOBS,
	payload: data,
});
