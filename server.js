const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Force CORS manually for Render
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Allow both localhost and GitHub Pages
    if (req.headers.origin === 'https://soloman992.github.io/blog-application/') {
        res.header('Access-Control-Allow-Origin', 'https://soloman992.github.io/blog-application/');
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Optional: Also keep this for more flexibility
app.use(cors({
    origin: ['http://localhost:3000', 'https://soloman992.github.io/blog-application/'], // ✅ Allow local & deployed frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(express.json());

mongoose.connect('mongodb+srv://fm01793176381:FAhiM12@cluster0.1o9aehc.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));