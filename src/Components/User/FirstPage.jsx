// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../Navbar/Navbar';
// import Footer from './Footer';

// const FirstPage = () => {
//   const navigate = useNavigate();

//   return (p-2">
//               <p className="w-8 md:w-11 h-[2px] bg-[#414141]" ></p>
//     <div>
//       <Navbar />
//       <div className="flex flex-col md:flex-row h-screen border border-gray-400">
//         {/* Left side with background image */}
//         <div
//           className="w-full md:w-1/2 h-1/2 md:h-full bg-cover bg-center"
//           style={{
//             // backgroundImage: "url('https://baby-planet-02.myshopify.com/cdn/shop/files/slideshow_1.jpg?v=1631619989')",
//             backgroundImage: "url('https://m.media-amazon.com/images/I/51Y3b2A-IZL.jpg')",
            
//           }}
//         ></div>

//         {/* Right side with text content */}
//         <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
//           <div className="text-[#414141]">
//             <div className="flex items-center ga
//               <p className="p-4 font-medium text-sm md:text-base text-purple-500">Baby Products</p>
//             </div>
//             <h1 className="text-2xl md:text-4xl font-bold mb-4">Explore Our Collection</h1>
//             <p className="text-gray-600 mb-6">Discover a range of high-quality products designed with love and care for your little ones.</p>
//             <button
//               onClick={() => navigate('/ProductList')}
//               className="w-36 py-2 px-4 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition duration-300"
//             >
//               Shop Now
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default FirstPage;










import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from './Footer';

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-[4rem]">
      <Navbar />
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background image with parallax effect */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out"
          style={{
            backgroundImage: "url('https://m.media-amazon.com/images/I/51Y3b2A-IZL.jpg')",
            transform: 'translateY(-10%)',
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full h-full text-center text-white">
          {/* Left Side (Background Image) */}
          <div className="w-full md:w-1/2 h-full flex items-center justify-center">
            {/* Image already set as background on top */}
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center px-6 py-10 text-left">
            <div className="text-[#b3b3b3] animate__animated animate__fadeIn animate__delay-1s">
              <div className="flex items-center justify-start gap-2 mb-4 animate__animated animate__fadeIn">
                <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                <p className="p-2 font-medium text-l md:text-base text-purple-500 text-bold">Baby Products</p>
                <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg animate__animated animate__fadeIn animate__delay-1s">
                Explore Our Collection
              </h1>
              <p className="text-gray-200 mb-6 text-lg drop-shadow-md max-w-lg animate__animated animate__fadeIn animate__delay-1s">
                Discover a range of high-quality products designed with love and care for your little ones.
              </p>
              <button
                onClick={() => navigate('/ProductList')}
                className="w-48 py-3 px-6 bg-purple-600 text-white font-semibold rounded-full shadow-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 transform hover:scale-110 hover:shadow-2xl"
              >
                Shop Now
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

