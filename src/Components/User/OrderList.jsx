// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../../Context/UserContext';
// import Navbar from '../Navbar/Navbar';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserOrder } from '../Redux/userSlice';

// const OrderList = () => {
//     const dispatch=useDispatch()
//     // const [orders, setOrders] = useState([]);
//     useEffect(()=>{
//         dispatch(fetchUserOrder(localStorage.getItem('id')))
//     },[])
//     const {order}=useSelector((state)=>state.user)
    
    

//     const handleClearAllOrders = async () => {
//         const id = localStorage.getItem("id");
//         try {
//             await axios.patch(`http://localhost:5000/users/${id}`, {
//                 order: [] // Empty the order list
//             });
//             setOrders([]); // Clear the orders in the state
//         } catch (error) {
//             console.log('Error clearing orders:', error.message);
//         }
//     };

    
//     const handleRemoveOrder = async (orderIndex) => {
//         const id = localStorage.getItem('id');
//         try {
//             const updatedOrders = orders.filter((order, index) => index !== orderIndex); // Filter out the order to remove
//             await axios.patch(`http://localhost:5000/users/${id}`, {
//                 order: updatedOrders // Update the user's orders
//             });
//             setOrders(updatedOrders); // Update the state with the filtered orders
//         } catch (error) {
//             console.log('Error removing order:', error.message);
//         }
//     };

//     return (
//         <div className="pt-[4rem]">
//             <Navbar />
//             <div className="max-w-4xl mx-auto px-4 py-6">
//                 <h1 className="text-2xl font-bold text-center mb-4">Order List</h1>
//                 {order.length === 0 ? (
//                     <p className="text-center text-lg">No orders found.</p>
//                 ) : (
//                     order.map((order, orderIndex) => (
//                         <div key={orderIndex} className="mb-4 border p-4 rounded-md shadow-md">
//                             <p className='text-lg font-semibold mb-2'>Order {orderIndex + 1}</p>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//                                 {order.items.map((product) => (
//                                     <div key={product.id} className="flex items-center border-b py-2">
//                                         <img
//                                             src={product.url}
//                                             className="w-24 h-24 object-cover rounded-md"
//                                             alt={product.name}
//                                         />
//                                         <div className="ml-4">
//                                             <p className="font-semibold">{product.name}</p>
//                                             <p className="text-gray-600"> ₹ {product.price}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Remove Order Button */}
//                             <button
//                                 className="mt-4 bg-black text-white px-6 py-2 rounded-2xl w-40 hover:bg-red-700 text-sm"
//                                 onClick={() => dispatch(handleRemoveOrder(orderIndex))}
//                             >
//                                 Remove Order {orderIndex + 1}
//                             </button>
//                         </div>
//                     ))
//                 )}
//                 {order.length > 0 && (
//                     <button
//                         className="bg-black text-white px-6 py-2 rounded-2xl w-1/2 mt-4 hover:bg-red-600 text-sm"
//                         onClick={()=>dispatch(handleClearAllOrders())}
//                     >
//                         CLEAR ALL ORDERS
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };
// export default OrderList;




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { fetchUserOrder, clearAllOrders, removeOrder } from '../Redux/userSlice';

const OrderList = () => {
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUserOrder(localStorage.getItem('id')));
    }, [dispatch]);

    const handleClearAllOrders = () => {
        const id = localStorage.getItem('id');
        dispatch(clearAllOrders(id));
    };

    const handleRemoveOrder = (orderIndex) => {
        const id = localStorage.getItem('id');
        dispatch(removeOrder({ id, orderIndex, orders: order }));
    };

    return (
        <div className="pt-[4rem]">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-center mb-4">Order List</h1>
                {order.length === 0 ? (
                    <p className="text-center text-lg">No orders found.</p>
                ) : (
                    order.map((order, orderIndex) => (
                        <div key={orderIndex} className="mb-4 border p-4 rounded-md shadow-md">
                            <p className="text-lg font-semibold mb-2">Order {orderIndex + 1}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {order.items.map((product) => (
                                    <div key={product.id} className="flex items-center border-b py-2">
                                        <img
                                            src={product.url}
                                            className="w-24 h-24 object-cover rounded-md"
                                            alt={product.name}
                                        />
                                        <div className="ml-4">
                                            <p className="font-semibold">{product.name}</p>
                                            <p className="text-gray-600"> ₹ {product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Remove Order Button */}
                            <button
                                className="mt-4 bg-black text-white px-6 py-2 rounded-2xl w-40 hover:bg-red-700 text-sm"
                                onClick={() => handleRemoveOrder(orderIndex)}
                            >
                                Remove Order {orderIndex + 1}
                            </button>
                        </div>
                    ))
                )}
                {order.length > 0 && (
                    <button
                        className="bg-black text-white px-6 py-2 rounded-2xl w-1/2 mt-4 hover:bg-red-600 text-sm"
                        onClick={handleClearAllOrders}
                    >
                        CLEAR ALL ORDERS
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderList;
