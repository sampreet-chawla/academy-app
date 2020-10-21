///////////////////////////
// Environmental Variables
///////////////////////////
require('dotenv').config();
const { PORT = 3000, NODE_ENV = 'development' } = process.env;

//MONGO CONNECTION
//const mongoose = require('./db/conn');

//CORS
const cors = require('cors');
// const corsOptions = require('./configs/cors.js');

//Bringing in Express
const express = require('express');
const app = express();

//OTHER IMPORTS
const morgan = require('morgan');
const cohortRouter = require('./controllers/cohortRoutes');
const studentRouter = require('./controllers/studentRoutes');

////////////
//MIDDLEWARE
////////////
// NODE_ENV === 'production' ? app.use(cors(corsOptions)) : app.use(cors());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny')); //logging

///////////////
//Routes and Routers
//////////////

//Default Route for testing server is working
app.get('/', (req, res) => {
	res.json({ hello: 'Welcome to Our Academy!' });
});

// Custom routes
app.use('/api/cohorts', cohortRouter);
app.use('/api/students', studentRouter);

//LISTENER
app.listen(PORT, () => {
	console.log(`Your are listening on port ${PORT}`);
});
