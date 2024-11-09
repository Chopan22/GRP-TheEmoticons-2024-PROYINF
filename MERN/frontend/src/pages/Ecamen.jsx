import React, { useState } from 'react';
import DicomViewer from '../components/DicomViewer';
import DicomUpload from '../components/DicomUpload';

const Examen = () => {
  return (
    <div className="App">
        <h1>DICOM Uploader</h1>
        <DicomUpload />
        <DicomViewer />
    </div>
);
};

export default Examen;
