import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  console.log('Wishlist state:', wishlist); // Check if wishlist is updating correctly

  const userId = localStorage.getItem("id");   //know to  which wishlist to load and update
  // const apiUrl = "http://localhost:5000/users";

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/users/${userId}`)
        .then((res) => setWishlist(res.data.wishlist || []))
        .catch((error) => console.error("Error fetching wishlist:", error));
    }
  }, [userId]);

  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);

      axios
        .patch(`http://localhost:5000/users/${userId}`, { wishlist: updatedWishlist })
        .catch((error) => console.error("Error updating wishlist:", error));
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);

    axios
      .patch(`http://localhost:5000/users/${userId}`, { wishlist: updatedWishlist })
      .catch((error) => console.error("Error updating wishlist:", error));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};


export default WishlistProvider;