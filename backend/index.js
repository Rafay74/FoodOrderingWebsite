const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path'); // Import the path module
const app = express();
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const uploadController = require('./controllers/uploadController');

// Load environment variables
dotenv.config();

// Serve static files
app.use('/images', express.static('public/images'))
// routes and middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// authentication
app.use('/auth', authController);
app.use('/product', productController);
app.use('/upload', uploadController);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB is connected');
        // Start the server
        app.listen(8000, () => {
            console.log('Server has been started');
        });
    })
    .catch((error) => {
        console.error('Failed to connect to DB:', error);
    });
