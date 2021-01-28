import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../../assets/images/back-arrow.png';
import './BackArrow.css';

function BackArrow() {
	return (
		<div className="arrow-container">
			<Link to="/">
				<img src={arrow} alt="Back arrow" className="arrow" />
				<span>Back</span>
			</Link>
			
		</div>
	);
}

export default BackArrow;
