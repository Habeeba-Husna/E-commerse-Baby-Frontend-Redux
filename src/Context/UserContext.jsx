import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    // Add loading state
    const [loading, setLoading] = useState(true);
    // Add error state
    const [error, setError] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("id");
        const fetchCart = async () => {
            if (!id) {
                setError('User ID is null. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setCart(response.data.cart);
            } catch (err) {
                setError(err.message || 'Failed to fetch cart data.');
                toast.error('Failed to fetch cart data.');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
        // Run once when the component mounts
    }, []);

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
    // console.log(totalPrice);

    const addToCart = async (product) => {
        const userId = localStorage.getItem("id");
        console.log('Product ID:', product.id);

        try {
            const productResponse = await axios.get(`http://localhost:5000/products/${product.id}`);
            const currentProduct = productResponse.data;

            const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
            const userCart = userResponse.data.cart;

            // Check if the item already exists in the cart
            const existingCartItem = userCart.find(item => item.id === product.id);
            if (existingCartItem) {
                if (existingCartItem.quantity + 1 > currentProduct.quantity) {
                    toast.error(`Cannot add more of ${currentProduct.name}. Only ${currentProduct.quantity - existingCartItem.quantity} left in stock.`);
                    return;
                }

                const updatedCartItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1
                };
                const remainingCart = userCart.filter((item) => item.id !== updatedCartItem.id);
                await axios.patch(`http://localhost:5000/users/${userId}`, { cart: [...remainingCart, updatedCartItem] });
                setCart(prevCart => prevCart.map(item => item.id === product.id ? updatedCartItem : item));
                toast.success(`Increased quantity of ${currentProduct.name} in the cart.`);
            } else {
                const newCartItem = { ...product, quantity: 1 };
                await axios.patch(`http://localhost:5000/users/${userId}`, { cart: [...userCart, newCartItem] });
                setCart(prevCart => [...prevCart, newCartItem]);
                toast.success("Item added to cart 🛒");
            }
        } catch (err) {
            toast.error('Failed to add product to the cart. Please try again.');
        }
    };
    const removeFromCart = (product) => {
        const id = localStorage.getItem("id")
        console.log(product)
        const deletedCart = cart.filter((item) => item.id !== product.id)
        axios.patch(`http://localhost:5000/users/${id}`, {
            cart: deletedCart
        })
            .then(() => {
                setCart(deletedCart)
            })
    }

    return (
        <UserContext.Provider value={{ cart, addToCart, loading, error, removeFromCart, totalPrice }}>
            {children}
            <ToastContainer />
        </UserContext.Provider>
    );
};
