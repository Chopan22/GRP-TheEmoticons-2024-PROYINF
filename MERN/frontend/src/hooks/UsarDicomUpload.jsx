import { useState } from 'react';
import axios from 'axios';
import { UsarAuthContexto } from "../hooks/UsarAuthContexto";


const useDicomUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { user } = UsarAuthContexto();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); 
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a DICOM file before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('dicomFile', selectedFile);

        try {
            setIsUploading(true);
            setError(null); 
            const response = await axios.post('http://localhost:4000/api/upload/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage(response.data.message);
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('There was an error uploading the file.');
        } finally {
            setIsUploading(false);
        }
    };

    return {
        selectedFile,
        isUploading,
        error,
        successMessage,
        handleFileChange,
        handleUpload,
    };
};

export default useDicomUpload;