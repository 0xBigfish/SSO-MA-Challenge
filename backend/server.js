// load environment variables from .env file if present
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

// import logging and set global logging for axios requests and responses
const unifiedLogger = require('./utils/unifiedLogger');
require('./utils/axiosLogger');

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(express.static('../frontend/dist'));

// console logging
app.use((req, res, next) => {
    console.log(`[server.js] Incoming request: ${req.method} ${req.url}`);
    next();
});

// logging so it's available from the /logs endpoint
app.use(unifiedLogger);

// Register all routes
app.use('/', routes);

app.listen(3000, () => console.log('App running on http://127.0.0.1:3000'));
