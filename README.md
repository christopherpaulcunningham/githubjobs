# Git a Job

Git a Job is a MERN app built using the GitHub Jobs API.

A web app to search and view the latest tech positions posted on GitHub Jobs by job title, keyword or location. Create an account and you can also save your favourite job postings for later. 

The live application can be found [here](https://git-a-job-v1.herokuapp.com/).

## Installation
1. Clone the repository.

2. Install NPM packages.
   ```sh
   npm install && cd client && npm install & cd ..
   ```
  
3. Create a ```.env``` file with the variables ```DB_CONNECTION_STRING``` and ```SECRET_OR_KEY```. My ```DB_CONNECTION_STRING``` variable links to a MongoDB database hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Add your own local or cloud database connection string here. The ```SECRET_OR_KEY``` variable is used to sign [JWT's](https://jwt.io/) for user authentication, so please give it a value.

4. Run the application.
   ```sh
   npm run dev
   ```
  
