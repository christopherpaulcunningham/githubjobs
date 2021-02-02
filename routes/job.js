const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
const router = express.Router();

// Load User model.
const User = require('../models/user');

// @route POST jobs/jobsList
// @desc Return a list of jobs matching the search params
router.post('/jobsList', async (req, res) => {
	try {
		let { description, fullTime, location, page } = req.body;

		// Format fields to accommodate spaces, etc.
		description = description ? encodeURIComponent(description) : '';
		location = location ? encodeURIComponent(location) : '';
		fullTime = fullTime ? '&full_time=on' : '';

		// The API gives a list of the latest 50 jobs only by default. Use page parameter to get more.
		if (page && !isNaN(parseInt(page))) {
			page = `&page=${page}`;
		} else {
			page = '';
		}

		// Retrieve a list of jobs using the search parameters.
		const query = `https://jobs.github.com/positions.json?description=${description}&location=${location}${fullTime}${page}`;
		const jobsList = await axios.get(query);

		// Occasionally, older jobs are showing up in the fetch from the API. Sort the jobs by date.
		const sortedJobs = jobsList.data.sort(
			(a, b) =>
			  new Date(b.created_at) - new Date(a.created_at)
		  );

		res.send(sortedJobs);
	} catch (err) {
		res.status(400).send('Error retrieving list of jobs. Try again later.');
	}
});

// @route POST jobs/jobById
// @desc Return the job with a matching ID
router.post('/jobById', async (req, res) => {
	try {
		let jobId = req.body.jobId;
		let userId = req.body.userId;

		// Retrieve the job matching the ID.
		const query = `https://jobs.github.com/positions/${jobId}.json?markdown=true`;
		const job = await axios.get(query);	
		
		if(userId){			
			// If a user is currently logged in, check to see if the curren job is a saved favourite.
			const user = await User.findById(userId);

			if(user.favourites.filter((post) => post.jobId === jobId).length > 0){
				job.data.isFavourite = true;
			}else{
				job.data.isFavourite = false;
			}
		}	

		res.send(job.data);
	} catch (err) {
		res.status(400).send('Error retrieving job details. Try again later.');
	}
});

module.exports = router;
