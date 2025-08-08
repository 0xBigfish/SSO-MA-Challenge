// load environment variables from .env file if present
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// import logging and set global logging for axios requests and responses
const unifiedLogger = require('./utils/unifiedLogger');
require('./utils/axiosLogger');

const app = express();
app.use(cors());
app.use(express.json());

// console logging
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// logging so it's available from the /logs endpoint
app.use(unifiedLogger);

// Register all routes
app.use('/', routes);

// Global error handler
//const errorHandler = require('./middleware/errorHandler');
//app.use(errorHandler);

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
