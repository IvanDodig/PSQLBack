/** @format */

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

// import routes
const commentsRoute = require('./Routes/comments');
app.use('/comments', commentsRoute);

const genresRoute = require('./Routes/genres');
app.use('/genres', genresRoute);

const moviesRoute = require('./Routes/movies');
app.use('/movies', moviesRoute);

const photosRoute = require('./Routes/photos');
app.use('/photos', photosRoute);

const reservationsRoute = require('./Routes/reservations');
app.use('/reservations', reservationsRoute);

const usersRoute = require('./Routes/users');
app.use('/users', usersRoute);

// Listen port
app.listen(4000);
