import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobById, toggleIsFavourite } from '../../actions/jobActions';
import {
	addFavouritePost,
	removeFavouritePost,
} from '../../actions/authActions';
import findElapsedTime from '../../utils/findElapsedTime';
import Loading from '../shared/Loading/Loading';
import BackArrow from '../shared/BackArrow/BackArrow';
import FavouriteButton from '../FavouriteButton/FavouriteButton';

import './JobDetails.css';

const JobDetails = ({ match }) => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const currentUser = useSelector((state) => state.auth.user);
	const currentJob = useSelector((state) => state.jobs.currentJob);
	const elapsedTime = findElapsedTime(currentJob.created_at);

	const jobId = match.params.id;
	const [isLoading, setIsLoading] = useState(false);

	// Load the job details.
	useEffect(() => {
		loadJob(jobId);
	}, []);

	const loadJob = (jobId) => {
		// Display loading message while the job details loads.
		setIsLoading(true);
		// Load the current job.
		dispatch(getJobById({ userId: currentUser.id, jobId: jobId }))
			.then(() => {
				setIsLoading(false);
			})
			.catch(() => setIsLoading(false));
	};

	const handleSaveClick = () => {
		if (currentJob.isFavourite) {
			// Remove the job from the list of favourites.
			dispatch(
				removeFavouritePost({ userId: currentUser.id, jobId: currentJob.id })
			);
			dispatch(toggleIsFavourite());
		} else {
			// Add the job to the list of favourites.
			dispatch(addFavouritePost({ userId: currentUser.id, job: currentJob }));
			dispatch(toggleIsFavourite());
		}
	};

	return (
		<div className="job-details-container">
			{isLoading ? (
				<Loading className="loading" />
			) : (
				<div>
					<BackArrow />
					{currentJob.title ? (
						<div>
							<div className="details-header-section">
								<div className="details-header-image-section">
									<img
										src={currentJob.company_logo}
										className="details-company-logo"
										alt={currentJob.company}
									/>
								</div>
								<div className="details-header-company-title">
									<div className="details-company-name">
										{currentJob.company}
									</div>
									<div className="details-company-url">
										<a
											href={currentJob.company_url}
											target="_blank"
											rel="noreferrer"
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
								<div className="fifty">
									<div className="post-heading">
										<span className="post-date">{elapsedTime}</span>
										<span className="job-type">{currentJob.type}</span>
									</div>
								</div>
								<div className="btn-fav-container">
									{isAuthenticated && (
										<FavouriteButton
											onClick={handleSaveClick}
											isFavourite={currentJob.isFavourite}
										/>
									)}
								</div>
								<div className="details-job-title">{currentJob.title}</div>
								<div className="details-job-location">
									{currentJob.location}
								</div>
								<div className="details-job-description">
									<div
										dangerouslySetInnerHTML={{ __html: currentJob.description }}
									></div>
								</div>
							</div>
							<div id="apply-now" className="apply-section">
								<h3>How to apply.</h3>
								<div
									dangerouslySetInnerHTML={{ __html: currentJob.how_to_apply }}
								></div>
							</div>
						</div>
					) : (
						<div className="no-details-found">There was a problem loading the job details, or the job listing has been removed. Please try again later.</div>
					)}
				</div>
			)}
		</div>
	);
};

export default JobDetails;
