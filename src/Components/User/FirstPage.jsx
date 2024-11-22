
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from './Footer';

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-[4rem] relative w-full h-screen overflow-hidden">
      <Navbar />
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://mom-n-me-demo.myshopify.com/cdn/shop/files/slider1_2000x.jpg?v=161370010')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start justify-start w-full h-full text-left text-white px-6 py-10">
          {/* Left Side Content (Aligned to the Left) */}
          <div className="w-full md:w-1/2 h-full flex flex-col items-start justify-center px-8 relative bg-transparent">
            {/* Logo */}
            <img
              src="https://mom-n-me-demo.myshopify.com/cdn/shop/files/slider-logo1_small.png?v=1613700138"
              alt="Logo"
              className="mb-4 brightness-110"
              style={{ width: '150px', height: 'auto' }}
            />

            {/* Main Text */}
            <h1 className="text-xl md:text-4xl font-extrabold text-[#ef7b84] mb-4 animate__animated animate__fadeIn animate__delay-1s">
              MULTITASKING COMES
            </h1>
            <h1 className="text-xl md:text-4xl font-extrabold text-[#ef7b84] mb-4 animate__animated animate__fadeIn animate__delay-1s pl-16">
              EASY TO YOU
            </h1>

            {/* Subtext */}
            <p className="text-[#68b5d2] text-lg mb-6 pl-20">
              kids safety cotton clothes
            </p>

            {/* View Collection Button - Positioned Below and Centered */}
            <div className="mt-6 flex justify-start w-full">
              <button
                onClick={() => navigate('/ProductList')}
                className="w-48 py-3 px-6 bg-[#ef7b84] text-white font-semibold rounded-full shadow-xl hover:bg-[#e76a75] focus:outline-none focus:ring-2 focus:ring-[#ef7b84] transition duration-300 transform hover:scale-110 hover:shadow-2xl"
              >
                View Collection
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FirstPage;


