import React from 'react';

import './SearchResults.css';
import JobItem from '../JobItem/JobItem';

const SearchResults = ({ results, isLoading }) => {
	let searchResults = '';

	if (results.length && results.length !== 0) {
		searchResults = results.map((job, index) => (
			<JobItem key={job.id} {...job} index={index} className="job-item" />
		));
	}else{
		if(!isLoading){
			searchResults = <span>No jobs to display.</span>;
		}		
	}

	return <div className="search-results-container">{searchResults}</div>;
};

export default SearchResults;
