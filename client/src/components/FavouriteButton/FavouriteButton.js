import React from 'react';
import favouriteIconTrue from '../../assets/images/favourite-true.png';
import favouriteIconFalse from '../../assets/images/favourite-false.png';
import './FavouriteButton.css';

const FavouriteButton = (props) => {
	return (
		<div className="favourite-button-container">
			<button className="btn-favourite" onClick={props.onClick}>
				<img className="favourite-icon" src={props.isFavourite ? favouriteIconTrue : favouriteIconFalse} alt="Save this post to favourites." />
			</button>
		</div>
	);
};

export default FavouriteButton;
