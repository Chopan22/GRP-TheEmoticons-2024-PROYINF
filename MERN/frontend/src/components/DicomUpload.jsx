import React, { useState } from 'react';
import axios from 'axios';
import { UsarAuthContexto } from '../hooks/UsarAuthContexto';



const DicomUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [responseMessage, setResponseMessage] = useState('');
  const { user } = UsarAuthContexto()

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setResponseMessage(''); // Clear previous messages
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setResponseMessage('Please select a DICOM file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('dicomFile', file);

    try {
      const response = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.token}`
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });
      setResponseMessage('Upload successful!');
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResponseMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload DICOM Image</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".dcm" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DicomUpload;