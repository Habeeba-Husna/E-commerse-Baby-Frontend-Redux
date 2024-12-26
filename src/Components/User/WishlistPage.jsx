


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, addToCart } from '../Redux/userSlice';
import { toast } from 'react-hot-toast';
import Navbar from '../Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../Redux/adminSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const [localWishlist, setLocalWishlist] = useState([]);  // State to hold wishlist from localStorage
  const wishlist = useSelector((state) => state.user.wishlist);
  const userId = localStorage.getItem('id');

  // Load wishlist from localStorage when component mounts
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setLocalWishlist(JSON.parse(storedWishlist)); // Set the local state with stored wishlist
    }
  }, []);

  // Sync localWishlist with Redux wishlist if it changes
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));  // Store updated wishlist in localStorage
    }
  }, [wishlist]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    if (userId) {
      dispatch(addToCart({ userId, newItem: product }))
        .unwrap()
        .then(() => {
          toast.success('Item added to cart');
        })
        .catch(() => {
          toast.error('Error adding item to cart');
        });
    } else {
      toast.error('Please log in to add to cart');
    }
  };

  // Handle Remove from Wishlist
  const handleRemoveFromWishlist = (productId) => {
    if (userId) {
      dispatch(removeFromWishlist({ userId, productId }))
        .unwrap()
        .then(() => {
          toast.success('Item removed from wishlist');
            // Remove from local state (localWishlist)
            const updatedWishlist = localWishlist.filter(product => product.id !== productId);
            setLocalWishlist(updatedWishlist);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update localStorage
        })
        .catch(() => {
          toast.error('Error removing item from wishlist');
        });
    } else {
      toast.error('Please log in to remove from wishlist');
    }
  };

  return (
    <div className="pt-[4rem]">
      <Navbar />
      <div>
        <div className="p-4">
          <h1 className="text-3xl font-semibold text-center mb-6">Your Wishlist</h1>
          {localWishlist.length === 0 ? (
            <p className="text-center text-lg text-gray-700">Your wishlist is empty!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {localWishlist.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 shadow-lg">
                  <div className="relative">
                    <img
                      src={product.url}
                      alt={product.name}
                      className="w-full h-80 object-cover rounded-md"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveFromWishlist(product.id)} // Directly remove from wishlist
                    >
                      <AiFillHeart className="text-xl" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-lg">{product.name}</p>
                    <p className="text-gray-500">Price: ₹{Number(product.price).toFixed(2)}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-black transition duration-200"
                        onClick={() => handleAddToCart(product)} // Add to cart on click
                      >
                        Add to Cart
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="text-blue-500 hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Wishlist;
