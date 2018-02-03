const express = require('express');
const {DATABASE} = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE).then(() => {
    console.log('connected to db!');
});

//body parser for parsing JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: "5mb", parameterLimit: 100000}));

//logger middleware
app.use(morgan('dev'));
//enable cors
app.use(cors());
//routes
userRoutes(app);
//error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

module.exports = app;
