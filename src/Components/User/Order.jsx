import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Form, ErrorMessage, Field, Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import Navbar from "../Navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";

function Order() {
    // const { cart, setCart, totalPrice, removeFromCart } = useContext(UserContext);
    const {cart}=useSelector((state)=>state.user)
    const totalPrice = cart.reduce(
        (total, product) => total + product.price * (product.quantity || 1),
        0
      );
    const [couponCode, setCouponCode] = useState("");  // State to store the coupon code
    const [finalPrice, setFinalPrice] = useState(totalPrice);  // State to store final price after discount
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const initialValues = {
        name: '',
        address: '',
        paymentMethod: "Credit Card"
    };

    
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required').max(200, 'Address not exceed more than 200 characters'),
        paymentMethod: Yup.string().oneOf(['Credit Card', 'PayPal', 'Bank Transfer'], 'Invalid Payment Method').required('Payment method is required')
    });

    // Function to apply coupon
    const applyCoupon = (code) => {
        if (code === "SHOP15") {
            if (totalPrice > 5000) {
                // Apply 15% discount if total is above ₹5000
                const discount = 0.15 * totalPrice;  // 15% discount
                setFinalPrice(totalPrice - discount);
                toast.success(`Coupon applied: 15% off on orders above ₹5000`);
            } else {
                toast.warning("Coupon requires a minimum order of ₹5000.");
            }
        } else {
            toast.error("Invalid coupon code.");
        }
    };

    const onSubmit = async (values) => {
        const id = localStorage.getItem('id');
        if (!id) {
            toast.error("User ID not found. Please log in.");
            return;
        }
        const order = {
            ...values,
            items: cart,
            total: finalPrice,  // Use finalPrice after discount
            date: new Date().toISOString(),
        };

        const confirmOrder = window.confirm("Are you sure you want to place this order?");
        if (!confirmOrder) return;

        try {
            const response = await axios.get(`http://localhost:5000/users/${id}`);
            const oldOrders = response.data.order || [];

            // Update the orders in the database
            await axios.patch(`http://localhost:5000/users/${id}`, {
                order: [...oldOrders, order],
                cart: [],
            });
            
          
            toast.success("Order placed successfully");
            navigate("/");
        } catch (error) {
            console.error("Order submission failed:", error);
            toast.error("Failed to place order");
        }
    };

    return (
        <div className="pt-[4rem]">
            <Navbar />
            <div className="p-4 sm:p-8 md:w-3/4 lg:w-2/3 mx-auto">
                <h1 className="text-center text-2xl font-semibold mb-6">My Order</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                            <Field type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
                            <ErrorMessage name="name" component='div' className="text-red-500 mt-1 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">Address</label>
                            <Field as='textarea' id="address" name="address" rows="4" className="flex justify-center w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your Shipping Address" />
                            <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="paymentMethod" className="block text-gray-700">Payment Method:</label>
                            <Field as="select" name="paymentMethod" id="paymentMethod" className="w-full px-3 py-2 border rounded">
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </Field>
                            <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <h1 className="text-lg font-semibold mt-6 mb-2">Order Summary</h1>
                            {cart.map((product) => (
                                <div key={product.id} className="flex justify-between items-center py-2 border-b text-sm md:text-base">
                                    <div className="flex items-center">
                                        <img src={product.url} alt={product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                                        <div>
                                            <p className="font-medium">{product.name}</p>
                                            <p className="text-gray-500 text-sm">{product.description}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-semibold">₹ {parseFloat(product.price || 0).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="flex justify-end items-center gap-4 p-4 mt-4 bg-gray-100 rounded-md">
                                <span className="text-lg font-bold">Total Price:</span>
                                <span className="text-lg font-semibold text-green-600">₹ {finalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Coupon Input */}
                        <div className="mb-4">
                            <label htmlFor="coupon" className="block text-lg font-medium text-gray-700 mb-2">Enter Coupon Code:</label>
                            <Field
                                type="text"
                                id="coupon"
                                name="coupon"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter coupon code"
                                onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => applyCoupon(couponCode)}
                                className="mt-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-green-900 hover:text-white"
                            >
                                Apply Coupon
                            </button>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button type='submit' className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-green-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Submit Order
                            </button>
                        </div>
                    </Form>
                </Formik>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Order;




