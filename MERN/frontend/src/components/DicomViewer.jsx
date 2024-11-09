import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UsarAuthContexto } from '../hooks/UsarAuthContexto';

//Aun no funciona esto ########################################

const DicomViewer = () => {
  const [images, setImages] = useState([]);
  const { user } = UsarAuthContexto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/upload/images',{
          headers: {
              'Authorization': `Bearer ${user.token}`
          }
      });
        // Check if response contains images
        if (Array.isArray(response.data)) {
            setImages(response.data); // Set images from response
        } else {
            console.error("Unexpected response format:", response.data);
            setError("Unexpected response format");
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images"); // Set error message
    } finally {
        setLoading(false); // Set loading to false after fetch completes
    }
};

  useEffect(() => {   
      fetchImages();
  }, []);

  return (
      <div>
          <h2>Uploaded DICOM Images</h2>
          <ul>
              {images.map((image) => (
                  <li key={image._id}>{image.data.data}</li>
              ))}
          </ul>
      </div>
  );
};

export default DicomViewer
