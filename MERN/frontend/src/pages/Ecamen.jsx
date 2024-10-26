import React, { useState } from 'react';
import DicomViewer from '../components/DicomViewer';
import DicomUpload from '../components/DicomUpload';

const Examen = () => {
  const [dicomId, setDicomId] = useState(''); // Replace with an actual DICOM ID

  const handleChange = (event) => {
    setDicomId(event.target.value);
  };

  return (
    <div>
      <h1>DICOM Viewer App</h1>
      <label>
        Enter DICOM ID:
        <input type="text" value={dicomId} onChange={handleChange} />
      </label>
      {dicomId && <DicomViewer dicomId={dicomId} />}

      <h1>DICOM Image Upload</h1>
      <DicomUpload />
    </div>
  );
};

export default Examen;