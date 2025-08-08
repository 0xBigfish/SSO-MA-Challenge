// load environment variables from .env file if present
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Register all routes
app.use('/', routes);

// Global error handler
//const errorHandler = require('./middleware/errorHandler');
//app.use(errorHandler);

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
