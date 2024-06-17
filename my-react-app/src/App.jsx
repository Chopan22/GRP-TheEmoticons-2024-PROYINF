import React, { useEffect } from 'react';
import Dicom from './dicom.jsx';
import Navbar from './Navbar.jsx';
import './App.css'
import { connectToMongoDB } from './assets/db/db.jsx';

function App() {
  useEffect( () => {
    connectToMongoDB().catch(console.error);
  }, []);
  
  return (
    <div>
      <Navbar />
      
      <Dicom />
    </div>
  );
}

export default App;