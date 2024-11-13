import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';

function Camera({ onCapture, onClose }) {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");
  const [isMobile, setIsMobile] = useState(false);
  const [zoom, setZoom] = useState(1); // Zoom level
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const previewRef = useRef(null);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iphone|ipad|ipod/i.test(userAgent));
  }, []);

  // Function to get video constraints based on the selected aspect ratio and zoom level
  const getVideoConstraints = () => {
    const aspectRatios = {
      "16:9": { width: 1280, height: 720 },
      "4:3": { width: 640, height: 480 },
      "1:1": { width: 640, height: 640 },
    };

    const width = aspectRatios[aspectRatio].width;
    const height = aspectRatios[aspectRatio].height;

    // Adjust the video resolution based on zoom
    const zoomedWidth = width / zoom;
    const zoomedHeight = height / zoom;

    return {
      facingMode,
      width: zoomedWidth,
      height: zoomedHeight,
    };
  };


  const capturePhoto = () => {
    if (previewRef.current) {

      html2canvas(previewRef.current, {
        scale: 1,
        logging: false,
        x: (previewRef.current.clientWidth - previewRef.current.clientWidth / zoom) / 2, // Horizontal crop to zoom
        y: (previewRef.current.clientHeight - previewRef.current.clientHeight / zoom) / 2, // Vertical crop to zoom
        width: previewRef.current.clientWidth / zoom, // Capture the zoomed area
        height: previewRef.current.clientHeight / zoom, // Capture the zoomed area
      }).then((canvas) => {
        const imageSrc = canvas.toDataURL("image/jpeg"); // Convert the canvas to image data URL
        onCapture(imageSrc); // Send the captured image to the parent component
      });
    }
  };

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  const getAspectRatioStyle = () => {
    switch (aspectRatio) {
      case "4:3":
        return "aspect-[4/3]";
      case "1:1":
        return "aspect-square";
      default:
        return "aspect-[16/9]";
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-5 rounded-lg shadow-lg fixed inset-x-4 top-20 max-h-screen overflow-auto z-50">
      {/* Camera Preview */}
      <div ref={previewRef} className={`relative overflow-hidden ${getAspectRatioStyle()} w-full max-w-md`}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={getVideoConstraints()} // Apply custom video constraints with zoom
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Zoom Control */}
      <div className="mt-4 w-full max-w-md">
        <label htmlFor="zoom" className="text-gray-700">Zoom:</label>
        <input
          id="zoom"
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      {/* Aspect Ratio Control */}
      <div className="mt-4 w-full max-w-md">
        <label htmlFor="aspectRatio" className="text-gray-700">Aspect Ratio:</label>
        <select
          id="aspectRatio"
          value={aspectRatio}
          onChange={(e) => setAspectRatio(e.target.value)}
          className="w-full mt-1"
        >
          <option value="16:9">16:9</option>
          <option value="4:3">4:3</option>
          <option value="1:1">1:1</option>
        </select>
      </div>

      {/* Capture and Switch Camera Buttons */}
      <div className="flex space-x-4 mt-6 max-w-md w-full justify-center">
        <button onClick={capturePhoto} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Capture Photo
        </button>
        {isMobile && (
          <button onClick={toggleCamera} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Switch to {facingMode === "user" ? "Back" : "Front"} Camera
          </button>
        )}
        <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Close Camera
        </button>
      </div>
    </div>
  );
}

export default Camera;
