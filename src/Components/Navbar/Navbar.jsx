// import React from 'react';
// import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
// import { IoMdSearch } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import { MdFavoriteBorder } from "react-icons/md";

// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white shadow-md sticky top-0 z-40">
//       {/* Upper section */}
//       <div className="bg-primary/90 py-3 px-5 sm:px-10">
//         <div className="container mx-auto flex justify-between items-center">
//           {/* Logo */}
//           <div>
//             <a className="text-3xl font-bold text-white hover:text-gray-300 transition duration-300" href="/">
//               BABy'S
//             </a>
//           </div>

//           <div className='flex flex-col md:flex-row items-center space-x-4 text-xl font-bold justify-center flex-grow'>
//           <Link to='/'>Home</Link>
//           <Link to='/shop'>Shop</Link>
//           <Link to='/category'>Category</Link>
//         </div>
          
//           {/* Search Bar */}
//           <div className="relative group flex-grow max-w-xs sm:max-w-md">
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
//             />
//             <IoMdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-primary transition-all duration-200" />
//           </div>
          
//           {/* Buttons */}
//           <div className="flex items-center gap-4">
//             {/* Cart Button */}
//             <button
//               onClick={() => navigate("/cart")}
//               className="flex items-center bg-gradient-to-r from-primary to-secondary/50 text-white py-2 px-4 rounded-full hover:bg-primary/80 transition-all duration-300"
//             >
//               <FaCartShopping className="text-xl" />
//               <span className="ml-2 hidden sm:block">Cart</span>
//             </button>
            
//             {/* Order History Button */}
//             <button
//               onClick={() => navigate("/order-History")}
//               className="flex items-center bg-gradient-to-r from-primary to-secondary/50 text-white py-2 px-4 rounded-full hover:bg-primary/80 transition-all duration-300"
//             >
//               <IoMdSearch className="text-xl" />
//               <span className="ml-2 hidden sm:block">Order History</span>
//             </button>
            
//             {/* Login Button */}
//             <button
//               onClick={() => navigate("/login")}
//               className="flex items-center bg-gradient-to-r from-primary to-secondary/50 text-white py-2 px-4 rounded-full hover:bg-primary/80 transition-all duration-300"
//             >
//               <FaCircleUser className="text-xl" />
//               <span className="ml-2 hidden sm:block">Login</span>
//             </button>
            
//             {/* Favorite Button */}
//             <button
//               onClick={() => navigate("/favourite")}
//               className="flex items-center bg-gradient-to-r from-primary to-secondary/50 text-white py-2 px-4 rounded-full hover:bg-primary/80 transition-all duration-300"
//             >
//               <MdFavoriteBorder className="text-xl" />
//               <span className="ml-2 hidden sm:block">Favorite</span>
//             </button>
            
//             {/* Logout Button */}
//             <button
//               onClick={() => {
//                 localStorage.removeItem("id");
//                 navigate("/");
//               }}
//               className="flex items-center bg-gradient-to-r from-primary to-secondary/50 text-white py-2 px-4 rounded-full hover:bg-primary/80 transition-all duration-300"
//             >
//               <MdFavoriteBorder className="text-xl" />
//               <span className="ml-2 hidden sm:block">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
