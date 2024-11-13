// src/components/Navbar.js
import React from 'react';
// import { FaImages } from 'react-icons/fa';  // Gallery icon from react-icons

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg w-full p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">📷</span>
          </div>
          <h1 className="text-2xl font-semibold ">Gallery</h1>
        </div>

        {/* <div className="flex items-center">
          <FaImages className="text-2xl hover:text-blue-300 transition duration-200" title="View Gallery" />
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
