require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/user');

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB.
mongoose.connect(process.env.DB_CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})
	.then(() => console.log('MongoDB connected successfully.'))
	.catch((err) => console.log(err));

// Passport middleware and configuration.
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use("/users", users);

// When the app is deployed, use whatever port. Locally, use port 5000.
const PORT = process.env.PORT || '5000';
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}.`);
});