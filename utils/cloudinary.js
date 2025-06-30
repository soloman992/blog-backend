const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dylvak22i',
    api_key: '889817545327336',
    api_secret: 'lUdIYU52Jyr1l0AzuS_IVEpq_s0'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Images', // you can name this whatever you want
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

module.exports = { cloudinary, storage };