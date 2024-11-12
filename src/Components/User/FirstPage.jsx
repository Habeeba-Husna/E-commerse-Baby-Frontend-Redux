import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from './Footer';

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen border border-gray-400">
        {/* Left side with background image */}
        <div
          className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://baby-planet-02.myshopify.com/cdn/shop/files/slideshow_1.jpg?v=1631619989')",
          }}
        ></div>

        {/* Right side with text content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
          <div className="text-[#414141]">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]" ></p>
              <p className="p-4 font-medium text-sm md:text-base text-purple-500">Baby Products</p>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-4">Explore Our Collection</h1>
            <p className="text-gray-600 mb-6">Discover a range of high-quality products designed with love and care for your little ones.</p>
            <button
              onClick={() => navigate('/ProductList')}
              className="w-36 py-2 px-4 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition duration-300"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FirstPage;





