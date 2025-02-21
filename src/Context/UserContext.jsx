import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import WishlistProvider from "./WishlistContext";
// import axiosInstance from "../api/axiosInstance";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [ratings, setRatings] = useState({}); // Store ratings by product ID

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const id = localStorage.getItem('id');
  const name = localStorage.getItem('name');
  
  // Set login status based on ID presence
  useEffect(() => {
    setIsLoggedIn(!!id);
  }, [id]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    // const fetchProducts = async () => {
    //   try {
    //     const response = await axiosInstance.get("products/getProduct");
    //     setProducts(response.data);
    //   } catch (error) {
    //     console.error("Error fetching products:", error.message);
    //   } finally {
    //     setLoadingProducts(false);
    //   }
    // };

    fetchProducts();
  }, [API_BASE_URL]);

  // Fetch cart data
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_BASE_URL}/users/${id}`)
        .then((res) => {
          setCart(res.data.cart || []);
          setOrder(res.data.order || []);
        })
        .catch((error) => {
          console.error("Error fetching user cart:", error);
          toast.error("Error fetching cart.");
        });
    }
  }, [id, API_BASE_URL]);

  // Add item to cart
  const addToCart = (item) => {
    const findCart = cart.find((cartItem) => cartItem.id === item.id);
    const updatedCart = findCart
      ? cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
      : [...cart, { ...item, quantity: 1 }];
    
    axios
      .patch(`${API_BASE_URL}/users/${id}`, { cart: updatedCart })
      .then(() => {
        toast.success(findCart ? "Quantity updated!" : "Item added to cart!");
        setCart(updatedCart);
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
        toast.error("Error updating cart.");
      });
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    axios
      .patch(`${API_BASE_URL}/users/${id}`, { cart: updatedCart })
      .then(() => {
        toast.success("Item removed from cart!");
        setCart(updatedCart);
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
        toast.error("Error removing item from cart.");
      });
  };

  // Increment item quantity
  const incrementQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrement item quantity
  const decrementQuantity = (itemId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  // Add product rating
  const addRating = (productId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * (product.quantity || 1),
    0
  );

  // Calculate total cart items
  const cartItemCount = cart.reduce((total, product) => total + (product.quantity || 1), 0);

  return (
    <WishlistProvider>
      <UserContext.Provider value={{
        isLoggedIn,
        products,
        cart,
        addToCart,
        removeFromCart,
        setCart,
        incrementQuantity,
        decrementQuantity,
        totalPrice,
        loadingProducts,
        id,
        name,
        setIsLoggedIn,
        setProducts,
        cartItemCount,
        ratings,
        addRating
      }}>
        {children}
      </UserContext.Provider>
    </WishlistProvider>
  );
};

export default UserContextProvider;








// import axios from "axios";
// import React, { createContext, useEffect, useState } from "react";
// import toast from 'react-hot-toast';
// import WishlistProvider from "./WishlistContext";

// export const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [order, setOrder] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [ratings, setRatings] = useState({}); // Store ratings by product ID

//   const id = localStorage.getItem('id');
//   const name = localStorage.getItem('name');
  
//   //tells whether the user login or not
//   useEffect(() => {
//     setIsLoggedIn(!!id);// (!!id) convert a value into a boolean
//   }, [id]);

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error.message);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Fetch cart data
//   useEffect(() => {
//     if (id) {
//       // console.log(`Fetching user with id: ${id}`); 
//       axios
//         .get(`http://localhost:5000/users/${id}`)
//         .then((res) => {
//           setCart(res.data.cart || []);
//           setOrder(res.data.order || []);
//         })
//         .catch((error) => {
//           console.error("Error fetching user cart:", error);
//           toast.error("Error fetching cart.");
//         });
//     }
//   }, [id]);

//   // Add item to cart
//   const addToCart = (item) => {
//     const findCart = cart.find((cartItem) => cartItem.id === item.id);
//     const updatedCart = findCart
//       ? cart.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem
//       )
//       : [...cart, { ...item, quantity: 1 }];
//     axios
//       .patch(`http://localhost:5000/users/${id}`, { cart: updatedCart })
//       .then(() => {
//         toast.success(findCart ? "Quantity updated!" : "Item added to cart!")
//         setCart(updatedCart);
//       })
//       .catch((error) => {
//         console.error("Error updating cart:", error);
//         toast.error("Error updating cart.");
//       });
//   };

//   // Remove item from cart
//   const removeFromCart = (item) => {
//     const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
//     axios
//       .patch(`http://localhost:5000/users/${id}`, { cart: updatedCart })
//       .then(() => {
//         toast.success("Item removed from cart!")

//         setCart(updatedCart);

//       })
//       .catch((error) => {
//         console.error("Error removing item from cart:", error);
//         toast.error("Error removing item from cart.");
//       });
//   };

//   // Increment item quantity
//   const incrementQuantity = (itemId) => {
//     const updatedCart = cart.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     setCart(updatedCart);
//   };

//   // Decrement item quantity
//   const decrementQuantity = (itemId) => {
//     const updatedCart = cart
//       .map((item) =>
//         item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
//       )
//       .filter((item) => item.quantity > 0);
//     setCart(updatedCart);
//   };

//   const addRating = (productId, rating) => {      //value of rating(1,2,3..)
//     setRatings((prevRatings) => ({
//       ...prevRatings,
//       [productId]: rating,
//     }));
//   };

//   const totalPrice = cart.reduce(
//     (total, product) => total + product.price * (product.quantity || 1),
//     0
//   );

//   // Calculate the number of items in the cart
//   const cartItemCount = cart.reduce((total, product) => total + (product.quantity || 1), 0);

//   return (
//     <WishlistProvider>
//       <UserContext.Provider value={{
//         isLoggedIn,
//         products,
//         cart,
//         addToCart,
//         removeFromCart,
//         setCart,
//         incrementQuantity,
//         decrementQuantity,
//         totalPrice,
//         loadingProducts,
//         id,
//         name,
//         setIsLoggedIn,
//         setProducts,
//         cartItemCount,
//         ratings,
//         addRating
//       }}>
//         {children}
//       </UserContext.Provider>
//     </WishlistProvider>
//   );
// };

// export default UserContextProvider;










// import axios from 'axios'
// import React, { createContext, useEffect, useState } from 'react'
// export const UserDataContext=createContext()
// function UserContext({children}) {
//     const [user,setUser]=useState([])
//     const [status,setStatus]=useState('')
//     useEffect(()=>{
//         const fetchUser=async()=>{
//             try{
//                 const response=await axios.get('http://localhost:5000/users')
//                 setUser(response.data)
//             }
//             catch(error)
//             {
//                 console.log(error.messege)
//             }
//         }
//         fetchUser()
//     },[user])
//     const block=async(id,status)=>{
//         try{
//             await axios.patch(`http://localhost:5000/users/${id}`,{status:!status})
//             setUser(user.map((userlist)=>(userlist.id===id?{...userlist,status:!status}:{...userlist})))
//         }
//         catch(error)
//         {
//             console.log(error.messege)
//         }
//     }
//     const totalOrder = user.reduce((acc, cur) => {
//         if (cur.order.length > 0) {
//             return acc.concat(cur.order);
//         }
//         return acc;
//     }, []);
    
//   return (
//     <UserDataContext.Provider value={{user,block,totalOrder}}>
//         {children}
//     </UserDataContext.Provider>
//   )
// }

// export default UserContext