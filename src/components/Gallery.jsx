import React, { useContext } from 'react';
import { ImageContext } from '../hooks/ImageContext';

// function Gallery({ onOpenCamera }) {
//   const { galleryImages, deleteImage } = useContext(ImageContext);

//   return (
//     <div className="w-full flex flex-col items-center mt-10">
//       {galleryImages.length === 0 ? (
//         <div className="text-center">
//           <h1 className="text-2xl font-semibold mb-2">Oops! No photos available.</h1>
//           <p className="text-gray-600 mb-4">Click below to take some photos!</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//           {galleryImages.map((image, index) => (
//             <div key={index} className="relative">
//               <img
//                 src={image}
//                 alt={`Captured ${index}`}
//                 className="max-w-[150px] max-h-[150px] object-contain rounded-lg shadow-md"
//               />
//               <button
//                 onClick={() => deleteImage(index)}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
//               >
//                 🗑️
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       <button onClick={onOpenCamera} className="mt-8 bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600">
//         Open Camera 📷
//       </button>
//     </div>
//   );
// }


function Gallery({ onOpenCamera }) {
  const { galleryImages, deleteImage } = useContext(ImageContext);

  return (
    <div className="w-full flex flex-col items-center mt-10">
      {galleryImages.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Oops! No photos available.</h1>
          <p className="text-gray-600 mb-4">Click below to take some photos!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Captured ${index}`}
                className="w-full h-40 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
              />
              <button
                onClick={() => deleteImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={onOpenCamera} className="mt-8 bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600">
        Open Camera 📷
      </button>
    </div>
  );
}


export default Gallery;
