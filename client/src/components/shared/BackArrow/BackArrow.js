import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../../assets/images/back-arrow.png';
import arrowHovered from '../../../assets/images/back-arrow-hovered.png';
import './BackArrow.css';

function BackArrow() {
	const [profileIconSource, setProfileIconSource] = useState(arrow);

	const changeImage = () => {
		if (profileIconSource === arrow) {
			setProfileIconSource(arrowHovered);
		} else {
			setProfileIconSource(arrow);
		}
	};
	return (
		<div className="arrow-container">
			<Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
				<div
					className="hover-container"
					onMouseOver={changeImage}
					onMouseOut={changeImage}
				>
					<img src={profileIconSource} alt="Back arrow" className="arrow" />
					<span>Back</span>
				</div>
			</Link>
		</div>
	);
}

export default BackArrow;
