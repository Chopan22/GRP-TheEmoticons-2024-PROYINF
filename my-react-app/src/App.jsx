import React, { useState } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <input type="file" onChange={handleImageUpload} />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" />
          <button onClick={handleImageDelete}>Delete Image</button>
        </div>
      )}
    </div>
  );
}

export default App;
