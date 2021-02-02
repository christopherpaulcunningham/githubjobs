import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFavouritePost } from '../../actions/authActions';

import findElapsedTime from '../../utils/findElapsedTime';
import deleteIcon from '../../assets/images/delete.png';
import eyeIcon from '../../assets/images/eye.png';
import './FavouriteItem.css';

const FavouriteItem = (props) => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);
	const job = props.job;
	const elapsedTime = findElapsedTime(job.created_at);

	const handleRemoveFavourite = () => {
		// Remove the job from the list of favourites.
		dispatch(removeFavouritePost({ userId: currentUser.id, jobId: job.jobId }));
	};

	return (
		<div className="favourite-item-container">
			<div className="image-container">
				<img src={job.company_logo} className="fav-logo" alt={job.company} />
			</div>
			<div className="info-container">
				<span className="fav-job-title info">{job.title}</span>
				<span className="fav-job-company info">{job.company}</span>
				<span className="fav-job-location info">{job.location}</span>
				<span className="fav-job-date-xs info">{elapsedTime}</span>
			</div>
			<div className="date-container">
				<span>{elapsedTime}</span>
			</div>
			<div className="button-container">
				<Link
					className="btn-view"
					to={`/job/${job.jobId}`}
					style={{ textDecoration: 'none' }}
				>
					<img src={eyeIcon} className="eye-icon" />
				</Link>
				<button className="btn-delete">
					<img
						className="trashcan-icon"
						src={deleteIcon}
						alt="Delete from favourites."
						onClick={handleRemoveFavourite}
					/>
				</button>
			</div>
		</div>
	);
};

export default FavouriteItem;
