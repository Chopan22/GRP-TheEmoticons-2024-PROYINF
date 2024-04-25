import React, { useState } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
    setZoom(1);
  };

  const handleImageClick = () => {
    setZoom(zoom === 1 ? 1.2 : 1);
  };

  return (
    <div className="App">
      <input type="file" onChange={handleImageUpload} />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" style={{ transform: `scale(${zoom})` }} onClick={handleImageClick} />
          <button onClick={handleImageDelete}>Delete Image</button>
        </div>
      )}
    </div>
  );
}

export default App;
