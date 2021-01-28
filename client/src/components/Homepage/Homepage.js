import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getJobsList } from '../../actions/jobActions';
import SearchBar from '../SearchBar.js/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './Homepage.css';

const Homepage = () => {
	const dispatch = useDispatch();
	const jobList = useSelector((state) => state.jobs.jobList);
	const currentJob = useSelector((state) => state.currentJob);

	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// When the list of jobs changes, update the results.
	useEffect(() => {
		setResults(jobList);
	}, [jobList]);

	const loadJobList = (searchParams) => {
		const { description, location, full_time, page = 1 } = searchParams;

		// Display loading message while list of jobs loads.
		setIsLoading(true);
		dispatch(getJobsList({ description, location, full_time, page }))
			.then(() => {
				setIsLoading(false);
			})
			.catch(() => setIsLoading(false));
	};

	const loadJobs = (searchParams) => {
		loadJobList(searchParams);
	};

	return (
		<div className="homepage-container">
			<SearchBar onSearch={loadJobs} />
			<span>{currentJob}</span>
			{isLoading ? (
				<span className="loading">Loading...</span>
			) : (
				<SearchResults results={results} />
			)}
		</div>
	);
};

export default Homepage;
