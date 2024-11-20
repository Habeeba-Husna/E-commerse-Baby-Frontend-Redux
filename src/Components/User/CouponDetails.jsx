// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../Navbar/Navbar'; // assuming you have a Navbar component
// import Footer from './Footer'; // assuming you have a Footer component
// import { toast } from 'react-toastify';

// const CouponDetails = () => {
//   const navigate = useNavigate();
//   const [couponCode, setCouponCode] = useState("XMAS65");

//   const handleCopyCoupon = () => {
//     navigator.clipboard.writeText(couponCode); // Copy the coupon to clipboard
//     toast.success(`Coupon ${couponCode} copied to clipboard!`);
//      // Navigate to the order page with coupon code
//      navigate('/order', { state: { couponCode } });
//   };

// //   return (
// //     <div className="pt-[4rem]">
// //       <Navbar />
// //       <div className="p-4">
// //         <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-md">
// //           <h1 className="text-2xl font-semibold text-center mb-4">Coupon Details</h1>

// //           <div className="mb-4">
// //             <h2 className="font-semibold text-lg text-gray-700">Coupon Code: <span className="text-blue-600">{couponCode}</span></h2>
// //             <p className="text-gray-500 mt-2">Use this code for 65% off during our Xmas Sale!</p>
// //           </div>

// //           <button
// //             onClick={handleCopyCoupon}
// //             className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
// //           >
// //             Copy Coupon Code
// //           </button>

// //           <div className="mt-6">
// //             <p className="text-sm text-gray-600">Terms and Conditions:</p>
// //             <ul className="list-disc list-inside text-sm text-gray-500">
// //               <li>Valid on all baby products.</li>
// //               <li>Cannot be combined with other offers.</li>
// //               <li>Expires on 31st December 2024.</li>
// //             </ul>
// //           </div>

// //           <button
// //             onClick={() => navigate('/productList')}  // Navigate back to product list
// //             className="w-full mt-4 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
// //           >
// //             Go Back to Products
// //           </button>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default CouponDetails;


// return (
//   <div className="pt-[4rem]">
//     <Navbar />
//     <div className="p-4">
//       <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-md">
//         <h1 className="text-2xl font-semibold text-center mb-4">Coupon Details</h1>

//         <div className="mb-4">
//           <h2 className="font-semibold text-lg text-gray-700">Coupon Code: <span className="text-blue-600">{couponCode}</span></h2>
//           <p className="text-gray-500 mt-2">Use this code for 65% off during our Xmas Sale!</p>
//         </div>

//         <button
//           onClick={handleCopyCoupon}
//           className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
//         >
//           Copy Coupon Code
//         </button>

//         <div className="mt-6">
//           <p className="text-sm text-gray-600">Terms and Conditions:</p>
//           <ul className="list-disc list-inside text-sm text-gray-500">
//             <li>Valid on all baby products.</li>
//             <li>Cannot be combined with other offers.</li>
//             <li>Expires on 31st December 2024.</li>
//           </ul>
//         </div>

//         <button
//           onClick={() => navigate('/productList')}  // Navigate back to product list
//           className="w-full mt-4 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
//         >
//           Go Back to Products
//         </button>
//       </div>
//     </div>

//     <Footer />
//   </div>
// );
// };

// export default CouponDetails;