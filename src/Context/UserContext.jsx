import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import WishlistProvider from "./WishlistContext";


export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loadingProducts, setLoadingProducts] = useState(true);

    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');

    // Check login status
    // useEffect(() => {
    //     const id = localStorage.getItem('id');
    //     if (id) {
    //         setIsLoggedIn(true);
    //     }
    //     else {
    //         setIsLoggedIn(false)
    //     }
    // }, [id])


    useEffect(() => {
        setIsLoggedIn(!!id);
      }, [id]);
    
     // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get("http://localhost:5000/products");
            setProducts(response.data);
          } catch (error) {
            console.error("Error fetching products:", error.message);
          } finally {
            setLoadingProducts(false);
          }
        };
        fetchProducts();
      }, []);

      // Fetch cart data
  useEffect(() => {
    if (id) {
      console.log(`Fetching user with id: ${id}`); 
      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) =>{
          setCart(res.data.cart || []);
          setOrder(res.data.order || []);
          
        })
        .catch((error) => {
          console.error("Error fetching user cart:", error);
          toast.error("Error fetching cart.");
        });
    }
  }, [id]);

  // // Fetch order data
  // useEffect(() => {
  //   if (id) {
  //     axios
  //       .get(`http://localhost:5000/users/${id}`)
  //       .then((res) => setOrder(res.data.order || []))
  //       .catch((error) => console.error("Error fetching user orders:", error));
  //   }
  // }, [id]);



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
      .patch(`http://localhost:5000/users/${id}`, { cart: updatedCart })
      .then(() => {
        toast.success(findCart ? "Quantity updated!" : "Item added to cart!")
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
      .patch(`http://localhost:5000/users/${id}`, { cart: updatedCart })
      .then(() =>{
        toast.success("Item removed from cart!")
      
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

  
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * (product.quantity || 1),
    0
  );

  

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
                 setProducts
            }}>
                {children}
            </UserContext.Provider>
        </WishlistProvider>
    );
};

export default UserContextProvider;
