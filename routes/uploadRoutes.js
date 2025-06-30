const express = require('express');
const multer = require('multer');
const { storage } = require('../utils/cloudinary'); // cloudinary setup
const router = express.Router();

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
    res.json({ imageUrl: req.file.path }); // Cloudinary gives you a direct URL here
});

module.exports = router;