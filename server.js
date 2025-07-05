const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// ✅ Full manual CORS header
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'https://soloman992.github.io/blog-application/'];
    const origin = req.headers.origin;

    // Log the origin for debugging
    console.log('Origin:', origin);

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin); // Dynamically allow only allowed origins
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests immediately
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());

// Upload image
app.use('/api/upload', uploadRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://fm01793176381:FAhiM12@cluster0.1o9aehc.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));