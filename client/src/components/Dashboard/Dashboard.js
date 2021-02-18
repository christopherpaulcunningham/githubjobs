import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentJob } from '../../actions/jobActions';
import FavouriteItem from '../FavouriteItem/FavouriteItem';
import './Dashboard.css';

const Dashboard = () => {
	const dispatch = useDispatch();
	let favourites = useSelector((state) => state.auth.user.favourites);

	// Sort the jobs by the date they were posted.
	favourites = favourites.sort(
		(a, b) => new Date(b.created_at) - new Date(a.created_at)
	);

	let favouriteItems = '';
	if (favourites.length && favourites.length !== 0) {
		favouriteItems = favourites.map((job, index) => (
			<FavouriteItem job={job} key={index} />
		));
	}

	useEffect(() => {
		// Reset the current job.
		dispatch(setCurrentJob({}));
	}, []);

	return (
		<div className="dashboard-container">
			<h2>Saved Jobs</h2>
			{favouriteItems.length > 0 ? (
				favouriteItems
			) : (
				<span>There are no saved jobs to display.</span>
			)}
		</div>
	);
};

export default Dashboard;
