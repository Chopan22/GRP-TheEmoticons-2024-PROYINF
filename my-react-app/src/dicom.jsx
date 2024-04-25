import React, { useState, useEffect } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';

// Initialize the cornerstoneWADOImageLoader library
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// Register the prefixes for the image loader
cornerstoneWADOImageLoader.configure({
  beforeSend: function(xhr) {
    // Add custom headers here (e.g. auth tokens)
    // xhr.setRequestHeader('x-auth-token', 'my auth token');
  },
});

function Dicom() {
    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        console.log(url)
        setFile(url);
    };

    const onFileUpload = () => {
        cornerstone.loadImage('wadouri:' + file).then((image) => {
        const element = document.getElementById('dicomImage');
        cornerstone.enable(element);
        cornerstone.displayImage(element, image);
        });
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
            <div id="dicomImage" style={{width: '512px', height: '512px'}}></div>
        </div>
    );
}

export default Dicom;