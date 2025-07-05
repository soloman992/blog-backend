import axios from 'axios';
import { useState } from 'react';

function ImageUploader({ setImageUrl }) {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('https://blog-backend-t8ey.onrender.com/api/upload', formData);
            setImageUrl(res.data.imageUrl);
            alert('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    return (
        <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
}

export default ImageUploader;