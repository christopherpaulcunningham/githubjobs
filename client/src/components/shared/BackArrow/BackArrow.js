import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentJob } from '../../../actions/jobActions';
import arrow from '../../../assets/images/back-arrow.png';
import arrowHovered from '../../../assets/images/back-arrow-hovered.png';
import './BackArrow.css';

function BackArrow() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [profileIconSource, setProfileIconSource] = useState(arrow);

	const changeImage = () => {
		if (profileIconSource === arrow) {
			setProfileIconSource(arrowHovered);
		} else {
			setProfileIconSource(arrow);
		}
	};

	const handleBackClick = () => {
		// Reset the current job.
		dispatch(setCurrentJob({}));

		// If the user has clicked on the 'Apply Now' button, this will affect the history.
		if (window.location.href.indexOf('apply') > -1) {
			history.go(-2);
		} else {
			history.go(-1);
		}
	};

	return (
		<div className="arrow-container">
			<div
				className="hover-container"
				onMouseOver={changeImage}
				onMouseOut={changeImage}
				onClick={handleBackClick}
			>
				<img src={profileIconSource} alt="Back arrow" className="arrow" />
				<span>Back</span>
			</div>
		</div>
	);
}

export default BackArrow;
