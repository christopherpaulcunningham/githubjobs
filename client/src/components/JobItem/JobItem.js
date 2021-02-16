import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import findElapsedTime from '../../utils/findElapsedTime';
import brokenImage from '../../assets/images/broken-image.png';

import './JobItem.css';

const JobItem = (props) => {
	const elapsedTime = findElapsedTime(props.created_at);
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<div className="job-item-container">
			<Link to={`/job/${props.id}`} style={{ textDecoration: 'none' }}>
				<div className="company-logo-container">
					<img
						src={imageLoaded && props.company_logo ? props.company_logo : brokenImage}
						className="company-logo"
						alt={props.company}
						width="100"
						height="100"
						onLoad={() => {
							setImageLoaded(true);
						}}
					/>
				</div>
				<div className="job-info">
					<div className="post-heading">
						<span className="post-date">{elapsedTime}</span>
						<span className="job-type">{props.type}</span>
					</div>
					<div className="job-title">{props.title}</div>
					<div className="company-name">{props.company}</div>
					<div className="job-location">{props.location}</div>
				</div>
			</Link>
		</div>
	);
};

export default JobItem;
