// load environment variables from .env file if present
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

// import logging and set global logging for axios requests and responses
const unifiedLogger = require('./utils/unifiedLogger');
require('./utils/axiosLogger');

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
}));
app.use(express.json());
app.options('/{*any}', cors());  // enable preflight for all routes

app.use(cookieParser());

app.use(express.static('../frontend/dist'));

// console logging
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// logging so it's available from the /logs endpoint
app.use(unifiedLogger);

// Register all routes
app.use('/', routes);

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
