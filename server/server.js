const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Wait for DB to connect, but don't crash if ENV string is missing/empty unless it fails
if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log("No MONGO_URI provided in .env - Skipping DB connection for dry run.");
}

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/svg', require('./routes/svgRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));

// Basic health check route
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
