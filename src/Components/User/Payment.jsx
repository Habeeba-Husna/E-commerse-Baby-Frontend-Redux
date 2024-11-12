// import React, { useContext, useState } from 'react';
// import { Usercontext } from '../../Context/ShopContext';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../Navbar/Navbar';

// const Payment = () => {
//   const navigate = useNavigate();
  
//   const { cart ,addToOrder } = useContext(Usercontext)

//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     // state: '',
//     // cardNumber: '',
//     // paymentMethod: 'card'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const totalprice = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//    const  orderdata ={
//       id:Date.now(),
//       items:cart,
//       total:totalprice,
//       ...formData,
//       date:new Date().toISOString()
//     }
//     addToOrder(orderdata)
//     navigate('/')
//   };

//   return (
//     <div>
//       <Navbar/>
    
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
       
//       <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
//         {/* <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Payment Details</h2> */}

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>

//         {/* <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div> */}


       

//         <div className='mb-4'>
//           <label className="block text-gray-700 text-sm font-bold mb-2">Cart order items :</label>
//           <div className='text-center'>
//            {cart.map((cartitem) => (
//             <div key={cartitem.id}>
//               <div className='gap-5 flex flex-row text-sm font-bold '>
//               <p>{cartitem.title}</p>
//               <p>{cartitem.price}</p>
//               <p>{cartitem.quantity}</p>
//               <p>{cartitem.price*cartitem.quantity}</p>
//             </div>
                 
//             </div>
//            ))}
//            <span className='font-bold text-md'>Total: ₹{totalprice}
//            </span>
//           </div>
//         </div>

//         {/* Payment Method Options */}
//         {/* <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
//           <div className="flex space-x-4">
//             <label className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="card"
//                 checked={formData.paymentMethod === 'card'}
//                 onChange={handleChange}
//                 className="form-radio h-4 w-4 text-blue-600"
//               />
//               <span>Card</span>
//             </label>
//             <label className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="cash"
//                 checked={formData.paymentMethod === 'cash'}
//                 onChange={handleChange}
//                 className="form-radio h-4 w-4 text-blue-600"
//               />
//               <span>Cash on Delivery</span>
//             </label>
//           </div>
//         </div> */}

//         {/* Card Details (only show if card is selected) */}
//         {/* {formData.paymentMethod === 'card' && (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
//               <input
//                 type="text"
//                 name="cardNumber"
//                 value={formData.cardNumber}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                 placeholder="1234 5678 9123 4567"
//                 required
//               />
//             </div>
            
//           </div>
//         )} */}

//         {/* Submit Button */}
//         <button
       
//           type="submit"
//           className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
//           Confirm Payment
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default Payment;