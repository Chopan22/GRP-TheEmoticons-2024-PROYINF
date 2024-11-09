import React, { useState } from 'react';
import useDicomUpload from '../hooks/UsarDicomUpload';


const DicomUpload = () => {
  const {
      selectedFile,
      isUploading,
      error,
      successMessage,
      handleFileChange,
      handleUpload,
  } = useDicomUpload();

  return (
      <div>
          <h2>Upload DICOM File</h2>
          <input type="file" accept=".dcm" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
  );
};

export default DicomUpload;
