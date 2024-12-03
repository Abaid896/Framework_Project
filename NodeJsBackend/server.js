const express = require('express');
const passport = require('passport');  
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const sqlite3 = require('sqlite3').verbose();  // Import sqlite3
require('./config/passport');
const controller = require('./controllers/controller')



require('dotenv').config();
const app = express();
const port = process.env.PORT || 7000;

app.use(passport.initialize());  // Initialize Passport
// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.json());

// SQLite database connection setup
const db = new sqlite3.Database('database.db', (err) => { 
    if (err) {
        console.error('Error opening SQLite database:', err);
    } else {
        console.log('SQLite database connection established successfully.');
    }
});


const corsOptions = {
    origin: 'http://localhost:3000',  // Allowed origin (your React app running on localhost:3000)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allow cookies to be sent with requests
    preflightContinue: false,  // Don't keep the preflight request
    optionsSuccessStatus: 204,  // For legacy browser support
};

app.use(cors(corsOptions));

app.use(require('../nodejsBackend/routes/route'));  

// Start the server
app.listen(port, () => {
   console.log('Server is running on port: ' + port);
});

module.exports = app;
