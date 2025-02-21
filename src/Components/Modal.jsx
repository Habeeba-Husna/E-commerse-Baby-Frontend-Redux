import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-white bg-white rounded-full p-2 hover:bg-gray-300 transition-colors"
        >
          ✖
        </button>
        
        {children}
      </div>
    </div>
  );
};

const Button = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}>
      {children}
    </button>
  );
};

export { Modal, Button };


