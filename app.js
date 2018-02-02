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
app.use(bodyParser.json({type: "*/*"}));
//logger middleware
app.use(morgan('combined'));
//enable cors
app.use(cors());
//routes
userRoutes(app);
//error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send({error: "Internal error"});
});

module.exports = app;
