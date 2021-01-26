const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
const router = express.Router();

router.post('/jobs', async (req, res) => {
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

		res.send(jobsList.data);
	} catch (err) {
		res.status(400).send('Error retrieving list of jobs. Try again later.');
	}
});

module.exports = router;
