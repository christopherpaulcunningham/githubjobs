import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getJobsList, setCurrentJob } from '../../actions/jobActions';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Loading from '../shared/Loading/Loading';
import './Homepage.css';

const Homepage = () => {
	const dispatch = useDispatch();
	const jobList = useSelector((state) => state.jobs.jobList);
	const currentJob = useSelector((state) => state.currentJob);

	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [searchParams, setSearchParams] = useState(null);
	const [hideLoadButton, setHideLoadButton] = useState(false);

	useEffect(() => {
		// When the screen first loads, display a list of the most recent jobs.
		if (!jobList.length > 0) {
			loadJobs({ description: '', location: '', fullTime: true });
		}

		// Reset the current job.
		dispatch(setCurrentJob({}));
	}, []);

	// When the list of jobs changes, update the results.
	useEffect(() => {
		setResults(jobList);
	}, [jobList]);

	// Search for jobs based on parameters, add the jobs to global state, and display.
	const loadJobList = (searchParams) => {
		const { description, location, full_time, page = 1 } = searchParams;

		// Check if there are more results to load.
		let isLoadMore = searchParams.hasOwnProperty('page') ? true : false;

		// Display loading message while list of jobs loads.
		isLoadMore ? setIsLoadingMore(true) : setIsLoading(true);
		dispatch(
			getJobsList({ description, location, full_time, page }, isLoadMore)
		)
			.then((res) => {
				if (res && res.payload.length === 0) {
					setHideLoadButton(true);
				} else {
					setHideLoadButton(false);
				}
				isLoadMore ? setIsLoadingMore(false) : setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
				setIsLoadingMore(false);
			});
	};

	const loadMoreJobs = () => {
		loadJobList({ ...searchParams, page: pageNumber + 1 });
		setPageNumber(pageNumber + 1);
	};

	const loadJobs = (searchParams) => {
		loadJobList(searchParams);
		setSearchParams(searchParams);
	};

	return (
		<div className="homepage-container">
			<SearchBar onSearch={loadJobs} />
			<span>{currentJob}</span>
			{isLoading && <Loading />}
			{<SearchResults results={results} isLoading={isLoading} />}
			{isLoadingMore && <Loading />}
			{results.length > 0 && !hideLoadButton && (
				<div className="load-more" onClick={isLoading ? null : loadMoreJobs}>
					<button
						id="btn-load-more"
						disabled={isLoading}
						className={`${isLoading ? 'disabled' : ''}`}
					>
						Load More
					</button>
				</div>
			)}
		</div>
	);
};

export default Homepage;
