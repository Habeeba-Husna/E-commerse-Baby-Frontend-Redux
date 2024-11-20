import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const WishlistContext = createContext();

// export const useWishlist = () => useContext(WishlistContext); // Custom hook to use the context

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  // console.log('Wishlist state:', wishlist); // Check if wishlist is updating correctly

  const userId = localStorage.getItem("id");
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

  // Load wishlist from backend when context initializes
  // useEffect(() => {
  //   if (userId) {
  //     axios
  //       .get(`${apiUrl}/${userId}`)
  //       .then((response) => {
  //         setWishlist(response.data.wishlist || []);
  //       })
  //       .catch((error) => console.error("Error fetching wishlist:", error));
  //   }
  // }, [userId]);

  // // Add item to wishlist
  // const addToWishlist = (product) => {
  //   if (!wishlist.find((item) => item.id === product.id)) {
  //     const updatedWishlist = [...wishlist, product];
  //     setWishlist(updatedWishlist);

  //     // Update backend
  //     axios
  //       .patch(`${apiUrl}/${userId}`, { wishlist: updatedWishlist })
  //       .catch((error) => console.error("Error updating wishlist:", error));
  //   }
  // };

  // // Remove item from wishlist
  // const removeFromWishlist = (productId) => {
  //   const updatedWishlist = wishlist.filter((item) => item.id !== productId);
  //   setWishlist(updatedWishlist);

  //   // Update backend
  //   axios
  //     .patch(`${apiUrl}/${userId}`, { wishlist: updatedWishlist })
  //     .catch((error) => console.error("Error updating wishlist:", error));
  // };

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};


export default WishlistProvider;