import React, { useState } from 'react';

import imgLoupe from '../../assets/images/loupe.png';
import imgLoupeWhite from '../../assets/images/loupe-white.png';
import imgPin from '../../assets/images/location-pin.png';
import './SearchBar.css';

const SearchBar = (props) => {
	const [formData, setFormData] = useState({
		description: '',
		location: '',
		fullTime: true,
	});

	const onChange = (evt) => {
		if (evt.target.id === 'fullTime') {
			setFormData((prevState) => ({
				...formData,
				[evt.target.id]: !prevState.fullTime,
			}));
		} else {
			setFormData({ ...formData, [evt.target.id]: evt.target.value });
		}
	};

	const handleSearch = (evt) => {
		evt.preventDefault();
		props.onSearch(formData);
	};

	return (
		<div className="searchbar-container">
			<div className="input-bar">
				<form onSubmit={handleSearch} className="form">
					<div className="input-section" id="description-section">
						<img src={imgLoupe} className="input-image" />
						<input
							id="description"
							name="description"
							className="searchbar-input"
							onChange={onChange}
							type="text"
							value={formData.description}
							placeholder={window.innerWidth < 576 ? "Job title, etc.." : "Filter by job title, companies, etc.." }
						/>
					</div>
					<div className="input-section" id="location-section">
						<img src={imgPin} className="input-image" />
						<input
							id="location"
							name="location"
							className="searchbar-input"
							onChange={onChange}
							type="text"
							value={formData.location}
							placeholder={window.innerWidth < 576 ? "Location.." : "Filter by location.." }
						/>
					</div>
					<div className="input-section" id="fulltime-section">
						<input
							id="fullTime"
							name="fullTime"
							className="searchbar-checkbox"
							onChange={onChange}
							type="checkbox"
							checked={formData.fullTime}
						/>
						<label className="label full-time-text-x-short" htmlFor="fullTime">FT</label>
						<label className="label full-time-text-short" htmlFor="fullTime">Full time</label>
						<label className="label full-time-text-long" htmlFor="fullTime">Full time only</label>
					</div>
					<button id="btn-search" className="searchbar-button" type="submit">
						Search
					</button>
					<button id="btn-search-xs" className="searchbar-button" type="submit"><img class="xs-button-img" src={imgLoupeWhite} /></button>
				</form>
			</div>
		</div>
	);
};

export default SearchBar;
