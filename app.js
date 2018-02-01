const express = require('express');
const {DATABASE} = require('./config/keys');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE).then(() => {
    console.log('connected to db!');
});

//middleware
app.use(bodyParser.json());

//routes
userRoutes(app);

//dummy route
app.get('/ping', (req, res) => {
    res.send('pong');
});

//error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send({error: "Internal error!"});
});

module.exports = app;
