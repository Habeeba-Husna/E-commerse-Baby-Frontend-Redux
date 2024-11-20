import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Form, ErrorMessage, Field, Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import Navbar from "../Navbar/Navbar";

function Order() {
    const { cart,setCart, totalPrice,removeFromCart } = useContext(UserContext)
    // console.log("Cart:", cart);
    // console.log("Total Price:", totalPrice);
    const navigate = useNavigate()

    const initialValues = {
        name: '',
        address: '',
        paymentMethod: "Credit Card"
    }
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required'),
        address: Yup.string()
            .required('Address is required').max(200, 'Address not exceed more than 200 characters'),
        paymentMethod: Yup.string()
            .oneOf(['Credit Card', 'PayPal', 'Bank Transfer'], 'Invalid Payment Method')
            .required('Payment method is required')
    })
    const onSubmit = async (values) => {
        const id = localStorage.getItem('id');
        const order = {
            ...values,
            items: cart,
            total: totalPrice,
        };
        // console.log("Order Data:", order);
        try {
            const response = await axios.get(`http://localhost:5000/users/${id}`);
            const oldOrders = response.data.order || [];
            // Use an empty array if undefined

            // Update the orders in the database
            await axios.patch(`http://localhost:5000/users/${id}`, {
                order: [...oldOrders, order],
                // Append new order to existing ones
                cart: [],
                // Clear the cart in the backend
            });
       // Clear the cart in the frontend context
//        cart.forEach(item => removeFromCart(item)); // Ensure each item has an id

//        toast.success('Order placed successfully');
//        navigate('/');
//    } catch (error) {
//        console.error('Order submission failed:', error);
//        toast.error('Failed to place order');
//    }
// };

    // Clear the cart in the frontend context directly
    setCart([]); // This assumes `setCart` is available in your context for directly resetting the cart state.

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
                <br />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                            <ErrorMessage name="name" component='div' className="text-red-500 mt-1 text-sm"></ErrorMessage>
                        </div>

                        {/* Address Input */}
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">Address</label>
                            <Field
                                as='textarea'
                                id="address"
                                name="address"
                                rows="4"
                                className="flex justify-center w-full  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your Shipping Address"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1"></ErrorMessage>
                        </div>
                        
                <div className="mb-4">
                            <label htmlFor="paymentMethod" className="block text-gray-700">Payment Method:</label>
                            <Field
                                as="select"
                                name="paymentMethod"
                                id="paymentMethod"
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </Field>
                            <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <h1 className="text-lg font-semibold mt-6 mb-2">Order Summary</h1>
                            {cart.map((product) => (
                                <div key={product.id} className="flex justify-between py-2 border-b text-sm md:text-base">
                                    <p>{product.name}</p>
                                    <p>₹ {parseFloat(product.price || 0).toFixed(2)}</p>
                                </div>
                            ))}

                            {/* <p className="text-right font-semibold mt-2">Total   :₹ {totalPrice.toFixed(2)}</p> */}
                            <div className="flex justify-end items-center gap-4 p-4 mt-4 bg-gray-100 rounded-md">
                                <span className="text-lg font-bold">Total Price:</span>
                                <span className="text-lg font-semibold text-green-600">₹ {totalPrice.toFixed(2)}</span>
                            </div>

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
    )
}
export default Order




// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../Context/UserContext';
// import { toast } from 'react-toastify';
// import Navbar from '../Navbar/Navbar'; 
// import Footer from './Footer'; 
// import { Form, ErrorMessage, Field, Formik } from 'formik'; 
// import * as Yup from 'yup'; 
// import axios from 'axios';

// function Order() {
//   const { cart, totalPrice, removeFromCart } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [couponCode, setCouponCode] = useState("");  // Default to empty
//   const [discount, setDiscount] = useState(0);  // To apply dynamic discount based on coupon

//   // If couponCode is passed through state from CouponDetails
//   React.useEffect(() => {
//     const state = window.history.state;
//     if (state && state.couponCode) {
//       setCouponCode(state.couponCode);
//       applyCouponDiscount(state.couponCode);
//     }
//   }, []);

//   const applyCouponDiscount = (couponCode) => {
//     // Example coupon validation logic
//     if (couponCode === 'XMAS65') {
//       setDiscount(0.65 * totalPrice); // 65% discount
//       toast.success('Coupon applied successfully: 65% discount');
//     } else {
//       setDiscount(0.10 * totalPrice); // Default 10% discount for invalid or unknown coupons
//       toast.info('Invalid or expired coupon, 10% discount applied');
//     }
//   };

//   const onSubmit = async (values) => {
//     const id = localStorage.getItem('id');
//     const order = {
//       ...values,
//       items: cart,
//       total: totalPrice - discount,
//     };

//     try {
//       const response = await axios.get(`http://localhost:5000/users/${id}`);
//       const oldOrders = response.data.order || [];
//       await axios.patch(`http://localhost:5000/users/${id}`, {
//         order: [...oldOrders, order],
//         cart: [],
//       });

//       // Clear the cart in frontend context
//       cart.forEach(item => {
//         removeFromCart(item); // Ensure each item has an id
//       });

//       toast.success('Order placed successfully');
//       navigate('/');
//     } catch (error) {
//       console.error('Order submission failed:', error);
//       toast.error('Failed to place order');
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="p-4 sm:p-8 md:w-3/4 lg:w-2/3 mx-auto">
//         <h1 className="text-center text-2xl font-semibold mb-6">My Order</h1>
//         <Formik initialValues={{ name: '', address: '', paymentMethod: "Credit Card" }} validationSchema={Yup.object({
//           name: Yup.string().required('Name is required'),
//           address: Yup.string().required('Address is required').max(200, 'Address cannot exceed 200 characters'),
//           paymentMethod: Yup.string().oneOf(['Credit Card', 'PayPal', 'Bank Transfer'], 'Invalid Payment Method').required('Payment method is required')
//         })} onSubmit={onSubmit}>
//           <Form>
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
//               <Field type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
//               <ErrorMessage name="name" component='div' className="text-red-500 mt-1 text-sm"></ErrorMessage>
//             </div>

//             <div className="mb-4">
//               <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">Address</label>
//               <Field as='textarea' id="address" name="address" rows="4" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your Shipping Address" />
//               <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1"></ErrorMessage>
//             </div>

//             <div className="mb-4">
//               <label htmlFor="paymentMethod" className="block text-gray-700">Payment Method:</label>
//               <Field as="select" name="paymentMethod" id="paymentMethod" className="w-full px-3 py-2 border rounded">
//                 <option value="Credit Card">Credit Card</option>
//                 <option value="PayPal">PayPal</option>
//                 <option value="Bank Transfer">Bank Transfer</option>
//               </Field>
//               <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             <div>
//               <h1 className="text-lg font-semibold mt-6 mb-2">Order Summary</h1>
//               {cart.map((product) => (
//                 <div key={product.id} className="flex justify-between py-2 border-b text-sm md:text-base">
//                   <p>{product.name}</p>
//                   <p>₹ {parseFloat(product.price || 0).toFixed(2)}</p>
//                 </div>
//               ))}
//               <div className="flex justify-end items-center gap-4 p-4 mt-4 bg-gray-100 rounded-md">
//                 <span className="text-lg font-bold">Total Price:</span>
//                 <span className="text-lg font-semibold text-green-600">₹ {totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-end items-center gap-4 p-4 mt-4 bg-gray-100 rounded-md">
//                 <span className="text-lg font-bold">Discount:</span>
//                 <span className="text-lg font-semibold text-red-600">₹ {discount.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-end items-center gap-4 p-4 mt-4 bg-gray-100 rounded-md">
//                 <span className="text-lg font-bold">Final Total:</span>
//                 <span className="text-lg font-semibold text-blue-600">₹ {(totalPrice - discount).toFixed(2)}</span>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 mt-4"
//             >
//               Place Order
//             </button>
//           </Form>
//         </Formik>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Order;


