import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import profileIcon from '../../assets/images/profileIcon.png';
import profileIconHovered from '../../assets/images/profileIconHovered.png';

import './Navbar.css';

const Navbar = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const [profileIconSource, setProfileIconSource] = useState(profileIcon);

	const logOut = () => {
		dispatch(logoutUser());
	};

	const hamburgerMenuClick = () => {
		document
			.getElementsByClassName('hamburger-button')[0]
			.classList.toggle('active');
		document
			.getElementsByClassName('navbar-links')[0]
			.classList.toggle('active');
	};

	const changeImage = () => {
		if (profileIconSource === profileIcon) {
			setProfileIconSource(profileIconHovered);
		} else {
			setProfileIconSource(profileIcon);
		}
	};

	return (
		<nav id="navbar">
			<div class="navbar-title">
				<Link to="/" className="header-link">
					githubjobs
				</Link>
			</div>
			<a class="hamburger-button" onClick={hamburgerMenuClick}>
				<span class="hamburger-bar" id="hamburger-bar-1"></span>
				<span class="hamburger-bar" id="hamburger-bar-2"></span>
				<span class="hamburger-bar" id="hamburger-bar-3"></span>
			</a>
			<div class="navbar-links">
				{auth.isAuthenticated ? (
					<ul className="hide">
						<li className="navbar-button">
							<Link to="/dashboard">
								<div
									className="profile authorised"
									onMouseOver={changeImage}
									onMouseOut={changeImage}
								>
									<img
										src={profileIconSource}
										id="profile-icon"
										alt="profile icon"
									/>
									<span className="user-details">{auth.user.firstName}</span>
								</div>
							</Link>
						</li>
						<li className="navbar-button nav-auth-button" onClick={logOut}>
							Logout
						</li>
					</ul>
				) : (
					<ul className="hide">
						<div className="hidden-profile">
							<li className="navbar-button">
								<div className="profile">
									<img src={profileIcon} id="profile-icon" alt="profile icon" />
									<span className="user-details">Member Area</span>
								</div>
							</li>
						</div>

						<Link to="/login" className="navbar-button nav-auth-button">
							Login
						</Link>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
