import React, { createContext, useState, useEffect } from 'react';
export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    // Load images from localStorage on mount
    const storedImages = JSON.parse(localStorage.getItem("images")) || [];
    setGalleryImages(storedImages);
  }, []);

  useEffect(() => {
    // Save images to localStorage whenever they change
    localStorage.setItem("images", JSON.stringify(galleryImages));
  }, [galleryImages]);

  const addImage = (image) => {
    setGalleryImages((prevImages) => [...prevImages, image]);
  };

  const deleteImage = (index) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <ImageContext.Provider value={{ galleryImages, addImage, deleteImage }}>
      {children}
    </ImageContext.Provider>
  );
};
