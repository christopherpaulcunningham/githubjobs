import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobById } from '../../actions/jobActions';
import findElapsedTime from '../../utils/findElapsedTime';
import Loading from '../shared/Loading/Loading';
import BackArrow from '../shared/BackArrow/BackArrow';

import './JobDetails.css';

const JobDetails = ({ match }) => {
	const dispatch = useDispatch();
	const currentJob = useSelector((state) => state.jobs.currentJob);
	const elapsedTime = findElapsedTime(currentJob.created_at);

	const jobId = match.params.id;
	const [isLoading, setIsLoading] = useState(false);

	const loadJob = (jobId) => {
		// Display loading message while the job details loads.
		setIsLoading(true);
		dispatch(getJobById({ id: jobId }))
			.then(() => {
				setIsLoading(false);
			})
			.catch(() => setIsLoading(false));
	};

	// Load the job details.
	useEffect(() => {
		loadJob(jobId);
	}, []);

	return (
		<div className="job-details-container">
			{isLoading ? (
				<Loading className="loading" />
			) : (
				<div>
					<BackArrow />
					<div className="details-header-section">
						<div className="details-header-image-section">
							<img
								src={currentJob.company_logo}
								className="details-company-logo"
								alt={currentJob.company}
							/>
						</div>
						<div className="details-header-company-title">
							<div className="details-company-name">{currentJob.company}</div>
							<div className="details-company-url">
								<a
									href={currentJob.company_url}
									target="_blank"
									className="url-link"
								>
									{currentJob.company_url}
								</a>
							</div>
						</div>
						<div className="details-header-button-section">
							<a className="apply-button" href="#apply-now">
								Apply Now
							</a>
						</div>
					</div>
					<div className="body-section">
						<div className="post-heading">
							<span className="post-date">{elapsedTime}</span>
							<span className="job-type">{currentJob.type}</span>
						</div>
						<div className="details-job-title">{currentJob.title}</div>
						<div className="details-job-location">{currentJob.location}</div>
						<div className="details-job-description">
							<div dangerouslySetInnerHTML={{ __html: currentJob.description }}>
								{/* {currentJob.description} */}
							</div>
						</div>
					</div>
					<div id="apply-now" className="apply-section">
						<h3>How to apply.</h3>
						<div
							dangerouslySetInnerHTML={{ __html: currentJob.how_to_apply }}
						></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default JobDetails;
