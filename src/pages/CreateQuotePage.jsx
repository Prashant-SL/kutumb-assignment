import { useState } from 'react';
import axios from 'axios';

const CreateQuotePage = () => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [mediaUrl, setMediaUrl] = useState('');

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                'https://crafto.app/crafto/v1.0/media/assignment/upload',
                formData
            );

            const uploadedImage = response.data[0];
            setMediaUrl(uploadedImage.url);
            alert("Image uploaded successfully");
        } catch (error) {
            console.error('Image upload failed', error);
        }
    };

    const handleCreateQuote = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'https://assignment.stage.crafto.app/postQuote', {
                text,
                mediaUrl,
            }, {
                headers: {
                    Authorization: token,
                },
            });
            console.log("response", response);
            if (Object.keys(response).length) alert("Quote created successfully");  
        } catch (error) {
            console.error('Error creating quote', error);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl mb-4">Create a Quote</h2>
            <input
                type="text"
                className="border p-1 mb-4 w-1/5 mr-2"
                placeholder="Quote Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="file"
                className="mb-4"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <div className='flex gap-4'>
                <button
                    className="bg-blue-500 text-white p-2 mb-4"
                    onClick={handleImageUpload}
                >
                    Upload Image
                </button>
                <button
                    className="bg-green-500 text-white p-2 mb-4"
                    onClick={handleCreateQuote}
                >
                    Create Quote
                </button>
            </div>
        </div>
    );
};

export default CreateQuotePage;
