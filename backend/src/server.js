const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database (Will skip gracefully if MONGO_URI is missing)
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
const paperRoutes = require('./routes/paperRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/papers', paperRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload-paper', (req, res, next) => {
    // Reroute to the paper router
    req.url = '/upload-paper';
    paperRoutes(req, res, next);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
