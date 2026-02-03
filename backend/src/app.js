const envFile = `.env.${process.env.NODE_ENV}`;
require('dotenv').config({ path: envFile });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

// Use morgan to log requests
morgan.token('timestamp', () => new Date().toISOString());
app.use(morgan('[:timestamp] :remote-addr :method :url :status :response-time ms'));

// Connect to database
connectDB();

// Load routes
app.use( '/api', require('./routes') );

// Manage errors
app.use((err, req, res, next) => {

});

// Run server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});