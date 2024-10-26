import React, { useEffect, useRef } from 'react';
import useDicom from '../hooks/UsarDicom';
import cornerstone from 'cornerstone-core';

const DicomViewer = ({ dicomId }) => {
  const { dicomData, metadata, loading } = useDicom(dicomId);
  const dicomElement = useRef(null);

  useEffect(() => {
    if (dicomData && dicomElement.current) {
      cornerstone.enable(dicomElement.current);
      cornerstone.loadImage(dicomData).then((image) => {
        cornerstone.displayImage(dicomElement.current, image);
      });
    }
  }, [dicomData]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>DICOM Viewer</h2>
      {metadata && (
        <div>
          <p>Patient Name: {metadata.patientName}</p>
          <p>Study Date: {metadata.studyDate}</p>
          <p>Modality: {metadata.modality}</p>
        </div>
      )}
      <div ref={dicomElement} style={{ width: '512px', height: '512px', border: '1px solid black' }}></div>
    </div>
  );
};

export default DicomViewer
