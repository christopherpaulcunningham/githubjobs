const findElapsedTime = (createdDate) => {
	const postedDate = new Date(createdDate);
	const currentDate = new Date();
	const difference = Math.abs(currentDate - postedDate) / 36e5;
	
	// If the job was posted less than 24hrs ago, round to nearest hour. Otherwise round to nearest hour.
	if (difference < 24) {
		if (Math.floor(difference) === 0) {
			return 'New!';
		}
		return Math.floor(difference) + 'h ago';
	} else {
		return Math.floor(difference / 24) + 'd ago';
	}
};

export default findElapsedTime;