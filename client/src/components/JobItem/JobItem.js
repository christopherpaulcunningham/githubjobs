import React from 'react';

import './JobItem.css';

const JobItem = (props) => {
	const companyLogo = props.company_logo;
	const postedDate = props.created_at;
	const jobType = props.type;
	const jobTitle = props.title;
	const companyName = props.company;
	const companyURL = props.company_url;
	const location = props.location;
	const index = props.index;
	const elapsedTime = findElapsedTime(postedDate);

	return (
		<div className="job-item-container">
			<div className="company-logo-container">
				<img
					src={companyLogo}
					className="company-logo"
					alt={companyName}
					width="100"
					height="100"
				/>
			</div>
			<div className="job-info">
				<div className="post-heading">
					<span className="post-date">{elapsedTime}</span>
					<span className="job-type">{jobType}</span>
				</div>
				<div className="job-title">{jobTitle}</div>
				<div className="company-name">{companyName}</div>
				<div className="job-location">{location}</div>
			</div>
		</div>
	);
};

const findElapsedTime = (createdDate) => {
	const postedDate = new Date(createdDate);
	const currentDate = new Date();
	const difference = Math.abs(currentDate - postedDate) / 36e5;

	console.log(difference);

	// If the job was posted less than 24hrs ago, round to nearest hour. Otherwise round to nearest hour.
	if (difference < 24) {
		if (Math.floor(difference) === 0) {
			return 'New!';
		}
		return Math.floor(difference) + 'h ago';
	} else {
		return Math.floor(difference / 24) + 'd ago';
	}
};

export default JobItem;
