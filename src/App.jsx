import React, { useContext, useState } from 'react';
import { ImageContext } from './hooks/ImageContext';
import Camera from './components/Camera';
import Gallery from './components/Gallery';
import Navbar from './components/Navbar';

function App() {
  const { addImage } = useContext(ImageContext);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleCapture = (image) => {
    addImage(image);  // Add captured image to context
    setIsCameraOpen(false);  // Close camera after capturing
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        {isCameraOpen ? (
          <Camera onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />
        ) : (
          <Gallery onOpenCamera={() => setIsCameraOpen(true)} />
        )}
      </div>
    </div>
  );
}

export default App;
