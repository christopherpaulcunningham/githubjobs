import React from 'react';

import './SearchResults.css';
import JobItem from '../JobItem/JobItem';

const SearchResults = ({ results }) => {
	return (
		<div className="search-results-container">
			{results.length && results.length !== 0 ? (
				results.map((job, index) => (
					<JobItem key={job.id} {...job} index={index} className="job-item" />
				))
			) : (
				<span>No jobs to display.</span>
			)}
		</div>
	);
};

export default SearchResults;
