// import React from 'react';
// import { useCart } from './CartContext'; // Use the Cart Context
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity } = useContext(UserContext);
//   const navigate = useNavigate();

  // Calculate total price
  // const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // // Handle quantity change
  // const handleQuantityChange = (e, productId) => {
  //   const newQuantity = parseInt(e.target.value, 10);
  //   if (newQuantity >= 1) {
  //     updateQuantity(productId, newQuantity);
  //   }
  // };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-600">Your cart is empty!</p>
//       ) : (
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div key={item.id} className="flex justify-between items-center bg-white p-4 shadow-lg rounded-lg">
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={item.url}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div>
//                   <p className="text-lg font-semibold text-gray-800">{item.name}</p>
//                   <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   min="1"
//                   className="w-12 p-2 text-center border rounded"
//                   onChange={(e) => handleQuantityChange(e, item.id)}
//                 />
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div className="flex justify-between items-center bg-gray-100 p-4 mt-4 rounded-lg">
//             <p className="text-lg font-semibold text-gray-800">Total: ${totalPrice.toFixed(2)}</p>
//             <button
//               onClick={() => navigate('/checkout')}
//               className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
