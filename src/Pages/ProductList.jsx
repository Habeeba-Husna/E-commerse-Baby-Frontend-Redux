// import React, { useContext, useState, useEffect } from 'react'
// import { UserContext } from '../Context/UserContext';
// import { CiSearch } from "react-icons/ci";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Add icons for wishlist
// import Navbar from '../Components/Navbar/Navbar';
// import { useNavigate,Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import { WishlistContext } from '../Context/WishlistContext';
// import { MdDiscount } from "react-icons/md";
// import Footer from '../Components/User/Footer';


// const ProductList = () => {
//   const navigate = useNavigate()
//   const [search, setSearch] = useState('');
//   const {wishlist,addToWishlist, removeFromWishlist} = useContext(WishlistContext); 
//   const { products, addToCart } = useContext(UserContext);

//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState(null);  // To track which section is clicked (Coupons or Offers)

//   const handleToggleSection = (section) => {
//     setActiveSection(activeSection === section ? null : section);  // Toggle the clicked section
//   }


//   const searchBarhandle = (e) => {
//     setSearch(e.target.value)
//   }

//   const handleWishlist = (product) => {
//     if (wishlist.some(item => item.id === product.id)) {
//       removeFromWishlist(product.id);  // Remove from wishlist
//       toast.info(`${product.name} removed from wishlist`);
//     } else {
//       addToWishlist(product);  // Add to wishlist
//       toast.success(`${product.name} added to wishlist`);
//     }
//   };

//   const filtered = products.filter(product =>
//     product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase())
//   );







//   // const handleCouponClick = () => {
//   //   // Navigate to the product details page or coupon page
//   //   navigate('/coupon');  // Replace with the correct route path for the coupon page
//   //   toast.success('Navigating to Coupon Page!');
//   // };







//   return (
//     <div className="pt-[4rem]">
//       <Navbar />
//       <div className='p-4'>
//         {/* Search Bar */}
//         <div className="flex items-center justify-center bg-white border border-gray-300 rounded-md p-2 w-60 h-10 mx-auto mb-6">
//           <CiSearch className="text-gray-500 text-xl mr-2" />
//           <input 
//           type="text" 
//           placeholder="Search for products..."
//             className="w-full outline-none text-gray-700 " 
//             onChange={searchBarhandle} 
//             />
//         </div>
//         <div className='p-4'>
//           {products.length === 0 ? (
//             <h1 className="text-2xl font-semibold text-center text-gray-700">
//               No products available
//               </h1>
//           ) : (
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
              
//               {filtered.map((product) => (
//                 <Link to={`/product/${product.id}`} key={product.id}>
//                   {/* <div key={product.id} className="group relative border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl"> */}
//                   <div className="group relative border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
//                     <div className="relative">

//                        {/* Wishlist Icon */}
//                        <button
//                         className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-3xl text-red-500 hover:text-red-600 transition duration-300"
//                         onClick={(e) => {
//                           e.preventDefault(); // Prevent navigation on button click
//                           handleWishlist(product);
//                         }}
//                       >
//                         {wishlist.some(item => item.id === product.id) ? (
//                           <AiFillHeart className="text-red-500 text-xl" />
//                         ) : (
//                           <AiOutlineHeart className="text-gray-500 text-xl" />
//                         )}
//                       </button>

//                       <img
//                         src={product.url}
//                         alt={product.name}
//                         className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
//                          />
                        
//                       {/* <p className="font-semibold">Title : {product.name}</p>
//                   <p>Price : ₹{Number(product.price)}</p> */}
//                       {product.quantity === 0 &&
//                         (<span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                           Out of stock
//                         </span>
//                         )}
//                     </div>
//                     <div className="p-4">
//                       <p className="font-semibold text-lg">{product.name}</p>
//                       <p className="text-gray-500">Price: ₹{Number(product.price).toFixed(2)}</p>
//                       {/* <p className="text-gray-600">Category: {product.category}</p> */}

//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();  // Prevent Link navigation on button click
//                         if (localStorage.getItem('id')) {
//                           addToCart(product);
//                           toast.success( "Item added to the cart!");
//                         } else {
//                           toast.info('Please login to add products to the cart');
//                           // toast.success('Please login');
//                           setTimeout(() => navigate('/login'), 1000);
//                         }
//                       }}
//                       className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200 ease-in-out">
//                       Add to Cart
//                     </button>

//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

// {/* Discount Button and Sections */}
// <div className="fixed right-4 top-1/2 transform -translate-y-1/2 w-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
//           <button
//             className="text-xl text-blue-500 hover:text-blue-600 focus:outline-none flex items-center justify-center w-full"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <MdDiscount className="mr-2" />
//             {/* Discounts */}
//           </button>

//           {isOpen && (
//             <div className="mt-4">
//               {/* Coupons Section */}
//               <h2
//                 className="font-semibold text-sm mb-2 text-blue-700 cursor-pointer"
//                 onClick={() => handleToggleSection("coupons")}
//               >
//                 Coupons
//               </h2>
//               {activeSection === "coupons" && (
//                 <div className="bg-white p-2 shadow-md rounded-md">
//                   <p
//                     onClick={() => toast.success('You can use this code for Xmas Sale: "XMAS65"')}





//                     // onClick={handleCouponClick} // Use the new handler to navigate





//                     className="cursor-pointer text-blue-700">
//                     Xmas Sale 65% Off - Click to copy coupon
//                   </p>
//                 </div>
//               )}

//               {/* Offers Section */}
//               <h2
//                 className="font-semibold text-sm mt-4 mb-2 text-blue-700 cursor-pointer"
//                 onClick={() => handleToggleSection("offers")}
//               >
//                 Offers
//               </h2>
//               {activeSection === "offers" && (
//                 <div className="bg-white p-2 shadow-md rounded-md">
//                   <p className="text-gray-400 italic">No offers available</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>


//       <ToastContainer />
//       <Footer/>
//     </div>
//   )
// }
// export default ProductList


































import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../Context/UserContext';
import { CiSearch } from "react-icons/ci";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Add icons for wishlist
import Navbar from '../Components/Navbar/Navbar';
import { useNavigate,Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { WishlistContext } from '../Context/WishlistContext';
import { MdDiscount } from "react-icons/md";
import Footer from '../Components/User/Footer';


const ProductList = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('');
  const {wishlist,addToWishlist, removeFromWishlist} = useContext(WishlistContext); 
  const { products, addToCart } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);  // To track which section is clicked (Coupons or Offers)

  const handleToggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);  // Toggle the clicked section
  }


  const searchBarhandle = (e) => {
    setSearch(e.target.value)
  }


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      removeFromWishlist(product.id);  // Remove from wishlist
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);  // Add to wishlist
      toast.success(`${product.name} added to wishlist`);
    }
  };

  // const filtered = products.filter(product =>
  //   product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase())
  // );

 // Filter products based on search term and category
 const filtered = products.filter(product => {
  const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
  const matchesCategory =
    selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
  return matchesSearch && matchesCategory;
});





  // const handleCouponClick = () => {
  //   // Navigate to the product details page or coupon page
  //   navigate('/coupon');  // Replace with the correct route path for the coupon page
  //   toast.success('Navigating to Coupon Page!');
  // };







  return (
    <div className="pt-[4rem]">
      <Navbar />
      <div className='p-4'>
        {/* Search Bar */}
        <div className="flex items-center justify-center gap-4 mb-6">
        <div className="flex items-center justify-center bg-white border border-gray-300 rounded-md p-2 w-60 h-10 mx-auto mb-6">
          <CiSearch className="text-gray-500 text-xl mr-2" />
          <input 
          type="text" 
          placeholder="Search for products..."
            className="w-full outline-none text-gray-700 " 
            onChange={searchBarhandle} 
            />
        </div>
        <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md p-2 h-10 bg-gray-400 text-white hover-black"
          >
            <option value="All">All Categories</option>
            {[...new Set(products.map(product => product.category))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className='p-4'>
          {products.length === 0 ? (
            <h1 className="text-2xl font-semibold text-center text-gray-700">
              No products available
              </h1>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
              
              {filtered.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  {/* <div key={product.id} className="group relative border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl"> */}
                  <div className="group relative border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
                    <div className="relative">

                       {/* Wishlist Icon */}
                       <button
                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-3xl text-red-500 hover:text-red-600 transition duration-300"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigation on button click
                          handleWishlist(product);
                        }}
                      >
                        {wishlist.some(item => item.id === product.id) ? (
                          <AiFillHeart className="text-red-500 text-xl" />
                        ) : (
                          <AiOutlineHeart className="text-gray-500 text-xl" />
                        )}
                      </button>

                      <img
                        src={product.url}
                        alt={product.name}
                        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                         />
                        
                      {/* <p className="font-semibold">Title : {product.name}</p>
                  <p>Price : ₹{Number(product.price)}</p> */}
                      {product.quantity === 0 &&
                        (<span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          Out of stock
                        </span>
                        )}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-lg">{product.name}</p>
                      <p className="text-gray-500">Price: ₹{Number(product.price).toFixed(2)}</p>
                      {/* <p className="text-gray-600">Category: {product.category}</p> */}

                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();  // Prevent Link navigation on button click
                        if (localStorage.getItem('id')) {
                          addToCart(product);
                          toast.success( "Item added to the cart!");
                        } else {
                          toast.info('Please login to add products to the cart');
                          // toast.success('Please login');
                          setTimeout(() => navigate('/login'), 1000);
                        }
                      }}
                      className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200 ease-in-out">
                      Add to Cart
                    </button>

                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

{/* Discount Button and Sections */}
<div className="fixed right-4 top-1/2 transform -translate-y-1/2 w-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <button
            className="text-xl text-blue-500 hover:text-blue-600 focus:outline-none flex items-center justify-center w-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdDiscount className="mr-2" />
            {/* Discounts */}
          </button>

          {isOpen && (
            <div className="mt-4">
              {/* Coupons Section */}
              <h2
                className="font-semibold text-sm mb-2 text-blue-700 cursor-pointer"
                onClick={() => handleToggleSection("coupons")}
              >
                Coupons
              </h2>
              {activeSection === "coupons" && (
                <div className="bg-white p-2 shadow-md rounded-md">
                  <p
                    onClick={() => toast.success('You can use this code for Xmas Sale: "XMAS65"')}





                    // onClick={handleCouponClick} // Use the new handler to navigate





                    className="cursor-pointer text-blue-700">
                    Xmas Sale 65% Off - Click to copy coupon
                  </p>
                </div>
              )}

              {/* Offers Section */}
              <h2
                className="font-semibold text-sm mt-4 mb-2 text-blue-700 cursor-pointer"
                onClick={() => handleToggleSection("offers")}
              >
                Offers
              </h2>
              {activeSection === "offers" && (
                <div className="bg-white p-2 shadow-md rounded-md">
                  <p className="text-gray-400 italic">No offers available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>


      <ToastContainer />
      <Footer/>
    </div>
  )
}
export default ProductList



// import React, { useContext, useState, useEffect } from 'react'
// import { UserContext } from '../Context/UserContext';
// import { CiSearch } from "react-icons/ci";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Add icons for wishlist
// import Navbar from '../Components/Navbar/Navbar';
// import { useNavigate } from 'react-router-dom';
// // import toast from 'react-hot-toast';
// import { toast, ToastContainer } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { WishlistContext } from '../Context/WishlistContext';
// import { MdDiscount } from "react-icons/md";
// import Footer from '../Components/User/Footer';


// const ProductList = () => {
//   const navigate = useNavigate()
//   const [search, setSearch] = useState('');
//   const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
//   const { products, addToCart } = useContext(UserContext);

//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState(null);  // To track which section is clicked (Coupons or Offers)

//   const handleToggleSection = (section) => {
//     setActiveSection(activeSection === section ? null : section);  // Toggle the clicked section
//   }


//   const searchBarhandle = (e) => {
//     setSearch(e.target.value)
//   }

//   const handleWishlist = (product) => {
//     if (wishlist.some(item => item.id === product.id)) {
//       removeFromWishlist(product.id);  // Remove from wishlist
//       toast.info(${product.name} removed from wishlist);
//     } else {
//       addToWishlist(product);  // Add to wishlist
//       toast.success(${product.name} added to wishlist);
//     }
//   };

//   const filtered = products.filter(product =>
//     product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="pt-[4rem]">
//       <Navbar />
//       <div className='p-4'>
//         {/* Search Bar */}
//         <div className="flex items-center justify-center bg-white border border-gray-300 rounded-md p-2 w-60 h-10 mx-auto mb-6">
//           <CiSearch className="text-gray-500 text-xl mr-2" />
//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="w-full outline-none text-gray-700 "
//             onChange={searchBarhandle}
//           />
//         </div>
//         <div className='p-4'>
//           {products.length === 0 ? (
//             <h1 className="text-2xl font-semibold text-center text-gray-700">
//               No products available
//             </h1>
//           ) : (
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
//               {filtered.map((product) => (
//                 <Link to={/product/${product.id}} key={product.id}>
//                   {/* <div key={product.id} className="group relative border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl"> */}
//                   <div className="group relative border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
//                     <div className="relative">

//                       {/* Wishlist Icon */}
//                       <button
//                         className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-3xl text-red-500 hover:text-red-600 transition duration-300"
//                         onClick={(e) => {
//                           e.preventDefault(); // Prevent navigation on button click
//                           handleWishlist(product);
//                         }}
//                       >
//                         {wishlist.some(item => item.id === product.id) ? (
//                           <AiFillHeart className="text-red-500 text-xl" />
//                         ) : (
//                           <AiOutlineHeart className="text-gray-500 text-xl" />
//                         )}
//                       </button>

//                       <img
//                         src={product.url}
//                         alt={product.name}
//                         className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
//                       />
//                       {product.quantity === 0 &&
//                         (<span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                           Out of stock
//                         </span>
//                         )}
//                     </div>
//                     <div className="p-4">
//                       <p className="font-semibold text-lg">{product.name}</p>
//                       <p className="text-gray-500">Price: ₹{Number(product.price).toFixed(2)}</p>
//                       {/* <p className="text-gray-600">Category: {product.category}</p> */}

//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();  // Prevent Link navigation on button click
//                         if (localStorage.getItem('id')) {
//                           addToCart(product);
//                           toast.success("Item added to the cart!");
//                         } else {
//                           toast.info('Please login to add products to the cart');
//                           // toast.success('Please login');
//                           setTimeout(() => navigate('/login'), 1000);
//                         }
//                       }}
//                       className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200 ease-in-out">
//                       Add to Cart
//                     </button>

//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="fixed right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col justify-center items-center">
//           {/* Toggle Button (Icon) */}
//           <button
//             className="text-xl text-blue-500 hover:text-blue-600 focus:outline-none"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <MdDiscount />
//           </button>

//           {/* Collapsible Content */}
//           {isOpen && (
//             <div className="mt-2 w-full">
//               {/* Categories (Coupons & Offers) */}
//               <h2
//                 className="font-semibold text-sm mb-2 text-blue-700 cursor-pointer"
//                 onClick={() => handleToggleSection("coupons")}
//               >
//                 Coupons
//               </h2>
//               {/* Coupons Section */}
//               {activeSection === "coupons" && (
//                 <ul className="list-disc pl-4 text-gray-700 text-xs">
//                   <li>10% off on orders above ₹500</li>
//                   <li>₹50 cashback on first order</li>
//                   <li>₹200 off on orders above ₹1000</li>
//                 </ul>
//               )}

//               <h2
//                 className="font-semibold text-sm mt-4 mb-2 text-blue-700 cursor-pointer"
//                 onClick={() => handleToggleSection("offers")}
//               >
//                 Offers
//               </h2>
//               {/* Offers Section */}
//               {activeSection === "offers" && (
//                 <ul className="list-disc pl-4 text-gray-700 text-xs">
//                   <li className="text-gray-400 italic">No offers available</li>
//                 </ul>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//       <ToastContainer />
//       <Footer />
//     </div>
//   )
// }
// export default ProductList












// import React, { useContext, useState } from 'react';
// import { UserContext } from '../Context/UserContext';
// import { CiSearch } from "react-icons/ci";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Add icons for wishlist
// import Navbar from '../Components/Navbar/Navbar';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { WishlistContext } from '../Context/WishlistContext';
// import Footer from '../Components/User/Footer';

// const ProductList = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState('');
//   const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext); 
//   const { products, addToCart } = useContext(UserContext);

//   const searchBarhandle = (e) => {
//     setSearch(e.target.value);
//   }

//   const handleWishlist = (product) => {
//     if (wishlist.some(item => item.id === product.id)) {
//       removeFromWishlist(product.id);  // Remove from wishlist
//       toast.info(`${product.name} removed from wishlist`);
//     } else {
//       addToWishlist(product);  // Add to wishlist
//       toast.success(`${product.name} added to wishlist`);
//     }
//   };

//   const filtered = products.filter(product =>
//     product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="pt-[4rem]">
//       <Navbar />
//       <div className='p-4'>
//         {/* Search Bar */}
//         <div className="flex items-center justify-center bg-white border border-gray-300 rounded-md p-2 w-60 h-10 mx-auto mb-6">
//           <CiSearch className="text-gray-500 text-xl mr-2" />
//           <input 
//             type="text" 
//             placeholder="Search for products..."
//             className="w-full outline-none text-gray-700 " 
//             onChange={searchBarhandle} 
//           />
//         </div>
//         <div className='p-4'>
//           {products.length === 0 ? (
//             <h1 className="text-2xl font-semibold text-center text-gray-700">
//               No products available
//             </h1>
//           ) : (
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
//               {filtered.map((product) => (
//                 <Link to={`/product/${product.id}`} key={product.id}>
//                   <div className="group relative border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl">
//                     <div className="relative">
//                       {/* Wishlist Icon */}
//                       <button
//                         className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-3xl text-red-500 hover:text-red-600 transition duration-300"
//                         onClick={(e) => {
//                           e.preventDefault(); // Prevent navigation on button click
//                           handleWishlist(product);
//                         }}
//                       >
//                         {wishlist.some(item => item.id === product.id) ? (
//                           <AiFillHeart className="text-red-500 text-xl" />
//                         ) : (
//                           <AiOutlineHeart className="text-gray-500 text-xl" />
//                         )}
//                       </button>
//                       <img
//                         src={product.url}
//                         alt={product.name}
//                         className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
//                       />
//                       {product.quantity === 0 && (
//                         <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                           Out of stock
//                         </span>
//                       )}
//                     </div>
//                     <div className="p-4">
//                       <p className="font-semibold text-lg">{product.name}</p>
//                       <p className="text-gray-500">Price: ₹{Number(product.price).toFixed(2)}</p>
//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();  // Prevent Link navigation on button click
//                         if (localStorage.getItem('id')) {
//                           addToCart(product);
//                           toast.success("Item added to the cart!");
//                         } else {
//                           toast.info('Please login to add products to the cart');
//                           setTimeout(() => navigate('/login'), 1000);
//                         }
//                       }}
//                       className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200 ease-in-out">
//                       Add to Cart
//                     </button>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <ToastContainer />
//       <Footer />
//     </div>
//   );
// };

// export default ProductList;
