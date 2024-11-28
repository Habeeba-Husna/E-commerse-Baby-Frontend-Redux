import React, { useEffect } from 'react';
import { WishlistContext } from '../../Context/WishlistContext'; // Import WishlistContext
import { UserContext } from '../../Context/UserContext'; // Import UserContext
import { AiFillHeart } from 'react-icons/ai'; // Import heart icons
import { ToastContainer, toast } from 'react-toastify'; // Toast notifications
import { useNavigate } from 'react-router-dom'; // Navigation
import { Link } from 'react-router-dom'; // Link to Product Details Page
import Navbar from '../Navbar/Navbar';
import axios from "axios"; // Axios for API requests

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, setWishlist } = React.useContext(WishlistContext); // Get wishlist context
  const { addToCart } = React.useContext(UserContext); // Get addToCart from UserContext

  const userId = localStorage.getItem("id"); // Current logged-in user ID
  const apiUrl = "http://localhost:5000/users"; //stores Base API URL

  // console.log(wishlist);

  // Load wishlist from backend when component mounts
  useEffect(() => {
    if (userId) {
      axios
        .get(`${apiUrl}/${userId}`)
        .then((response) => setWishlist(response.data.wishlist || []))
        .catch(() => toast.error("Unable to load wishlist."));
    }
  }, [userId, setWishlist]);

  // Remove from Wishlist Handler
  const handleRemoveFromWishlist = (productId) => {
    if (userId) {
      const updatedWishlist = wishlist.filter((item) => item.id !== productId);
      axios
        .patch(`${apiUrl}/${userId}`, { wishlist: updatedWishlist })
        .then(() => {
          setWishlist(updatedWishlist);
          toast.info("Item removed from wishlist.");
        })
        .catch(() => toast.error("Failed to update wishlist."));
    }
  };

  // Add to Cart Handler
  const handleAddToCart = (product) => {
    if (userId) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error("Please login to add items to the cart");
      setTimeout(() => navigate("/login"), 1000);
    }
  };

  return (

    <div className="pt-[4rem]">
      <Navbar />
      <div>
        <div className="p-4">
          <h1 className="text-3xl font-semibold text-center mb-6">Your Wishlist</h1>
          {wishlist.length === 0 ? (
            <p className="text-center text-lg text-gray-700">Your wishlist is empty!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {wishlist.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 shadow-lg">
                  <div className="relative">
                    <img
                      src={product.url}
                      alt={product.name}
                      className="w-full h-80 object-cover rounded-md"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveFromWishlist(product.id)}// Directly remove from wishlist
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

export default WishlistPage;




// import React, { useEffect } from 'react';
// import { WishlistContext } from '../../Context/WishlistContext';
// import { UserContext } from '../../Context/UserContext';
// import { AiFillHeart } from 'react-icons/ai';
// import { toast } from 'react-toastify';
// import { useNavigate, Link } from 'react-router-dom';
// import Navbar from '../Navbar/Navbar';
// import axios from "axios";

// const WishlistPage = () => {
//   const navigate = useNavigate();
//   const { wishlist, setWishlist } = React.useContext(WishlistContext);
//   const { addToCart } = React.useContext(UserContext);

//   const userId = localStorage.getItem("id");
//   const apiUrl = "http://localhost:5000/users";

//   useEffect(() => {
//     if (userId) {
//       axios
//         .get(`${apiUrl}/${userId}`)
//         .then((response) => {
//           const fetchedWishlist = response.data.wishlist || [];
//           setWishlist(fetchedWishlist);
//         })
//         .catch(() => toast.error("Unable to load wishlist."));
//     }
//   }, [userId, setWishlist]);

//   const handleRemoveFromWishlist = (productId) => {
//     if (userId) {
//       const updatedWishlist = wishlist.filter((item) => item.id !== productId);
//       axios
//         .patch(`${apiUrl}/${userId}`, { wishlist: updatedWishlist })
//         .then(() => {
//           setWishlist(updatedWishlist);
//           toast.info("Item removed from wishlist.");
//         })
//         .catch(() => toast.error("Failed to update wishlist."));
//     }
//   };

//   const handleAddToCart = (product) => {
//     if (userId) {
//       addToCart(product);
//       toast.success(`${product.name} added to cart!`);
//     } else {
//       toast.error("Please login to add items to the cart");
//       setTimeout(() => navigate("/login"), 1000);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="p-4">
//         <h1 className="text-3xl font-semibold text-center mb-6">Your Wishlist</h1>
//         {wishlist.length === 0 ? (
//           <p className="text-center text-lg text-gray-700">Your wishlist is empty!</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             {wishlist.map((product) => (
//               <div key={product.id} className="border border-gray-200 rounded-lg p-4 shadow-lg">
//                 <div className="relative">
//                   <img
//                     src={product.url}
//                     alt={product.name}
//                     className="w-full h-80 object-cover rounded-md"
//                   />
//                   <button
//                     className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-red-500"
//                     onClick={() => handleRemoveFromWishlist(product.id)}
//                   >
//                     <AiFillHeart className="text-xl" />
//                   </button>
//                 </div>
//                 <div className="p-4">
//                   <p className="font-semibold text-lg">{product.name}</p>
//                   <p className="text-gray-500">Price: ₹{Number(product.price).toFixed(2)}</p>
//                   <div className="flex justify-between mt-4">
//                     <button
//                       className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-black transition duration-200"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       Add to Cart
//                     </button>
//                     <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;
