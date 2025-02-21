// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { changeFavorite} from '../features/favouriteSlice'
// import {addToCart } from '../features/cartSlice';
// import { toast } from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';
// import { AiFillHeart } from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import { getAllUsers } from '../features/adminSlice';

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const [localWishlist, setLocalWishlist] = useState([]);  // State to hold wishlist from localStorage
//   const wishlist = useSelector((state) => state.favourite.favorite);
//   const userId = localStorage.getItem('id');

//   // Load wishlist from localStorage when component mounts
//   useEffect(() => {
//     const storedWishlist = localStorage.getItem('wishlist');
//     if (storedWishlist) {
//       setLocalWishlist(JSON.parse(storedWishlist)); // Set the local state with stored wishlist
//     }
//   }, []);

//   // Sync localWishlist with Redux wishlist if it changes
//   useEffect(() => {
//     if (wishlist.length > 0) {
//       localStorage.setItem('wishlist', JSON.stringify(wishlist));  // Store updated wishlist in localStorage
//     }
//   }, [wishlist]);

//   useEffect(() => {
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   // Handle Add to Cart
//   const handleAddToCart = (product) => {
//     if (userId) {
//       dispatch(addToCart({ userId, newItem: product }))
//         .unwrap()
//         .then(() => {
//           toast.success('Item added to cart');
//         })
//         .catch(() => {
//           toast.error('Error adding item to cart');
//         });
//     } else {
//       toast.error('Please log in to add to cart');
//     }
//   };

//   // Handle Remove from Wishlist
//   const handleRemoveFromWishlist = (productId) => {
//     if (userId) {
//       dispatch(changeFavorite({ userId, productId }))
//         .unwrap()
//         .then(() => {
//           toast.success('Item removed from wishlist');
//             // Remove from local state (localWishlist)
//             const updatedWishlist = localWishlist.filter(product => product.id !== productId);
//             setLocalWishlist(updatedWishlist);
//             localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update localStorage
//         })
//         .catch(() => {
//           toast.error('Error removing item from wishlist');
//         });
//     } else {
//       toast.error('Please log in to remove from wishlist');
//     }
//   };

//   return (
     
//       <div>
//         <div className="p-4">
//           <h1 className="text-3xl font-semibold text-center mb-6">Your Wishlist</h1>
//           {localWishlist.length === 0 ? (
//             <p className="text-center text-lg text-gray-700">Your wishlist is empty!</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//               {localWishlist.map((product) => (
//                 <div key={product.id || product._id} className="border border-gray-200 rounded-lg p-4 shadow-lg">
//                   <div className="relative">
//                     <img
//                       src={product.url}
//                       alt={product.name}
//                       className="w-full h-80 object-cover rounded-md"
//                     />
//                     <button
//                       className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-red-500"
//                       onClick={() => handleRemoveFromWishlist(product.id)} // Directly remove from wishlist
//                     >
//                       <AiFillHeart className="text-xl" />
//                     </button>
//                   </div>
//                   <div className="p-4">
//                     <p className="font-semibold text-lg">{product.name}</p>
//                     <p className="text-gray-500">Price: ₹{Number(product.price).toFixed(2)}</p>
//                     <div className="flex justify-between mt-4">
//                       <button
//                         className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-black transition duration-200"
//                         onClick={() => handleAddToCart(product)} // Add to cart on click
//                       >
//                         Add to Cart
//                       </button>
//                       <Link
//                         to={`/product/${product.id}`}
//                         className="text-blue-500 hover:underline">
//                         View Details
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Wishlist;




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite, changeFavorite } from '../features/favouriteSlice';
import { addToCart } from "../features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { favorite, loading, error } = useSelector((state) => state.favourite);

  useEffect(() => {
    dispatch(getFavorite());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-700 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{`Error: ${error}`}</div>;
  }

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
    toast.success("Added to cart");
  };

  const handleFavorite = (id) => {
    dispatch(changeFavorite(id));
    toast.success('Updated Favorite');
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Favorites</h2>
      {favorite.length === 0 ? (
        <h3 className="text-center text-lg text-gray-500">You have no favorite products.</h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorite.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
              <img src={product.url} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                <p className="text-gray-600 text-sm">₹ {product.price}</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
                {/* Add to Cart Button */}
                <button
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </button>

                {/* Wishlist Button */}
                <button onClick={() => handleFavorite(product._id)} className="ml-2">
                  {favorite.some((item) => item._id === product._id) ? (
                    <MdFavorite className="text-3xl text-red-500 hover:text-red-600 transition-colors duration-200" />
                  ) : (
                    <MdFavoriteBorder className="text-3xl hover:text-red-800 transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;