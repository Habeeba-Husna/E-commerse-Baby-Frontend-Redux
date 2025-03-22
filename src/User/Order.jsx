import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showOrders } from "../features/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(showOrders()); // Dispatch the action to fetch orders
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-4">Order List</h1>
      {orders.length === 0 ? (
        <p className="text-center text-lg">No orders found.</p>
      ) : (
        orders.map((order,index) => (
          <div key={index} className="mb-4 border p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-2">Order {index + 1}</p>
            <p className="text-lg font-semibold mb-2">Order ID: {order._id}</p>
            <p className="text-md mb-2">Full name: {order.name}</p>
            <p className="text-md mb-2">Order Status: {order.status}</p>
            <p className="text-md mb-2">Payment Status: {order.razorpayPaymentStatus}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {order.items && order.items.map((product) => (
  product.productId && (
                <div
                  key={product.productId._id}
                  className="flex items-center border-b py-2"
                >
                  <img
                    src={product.productId.url}
                    className="w-24 h-24 object-cover rounded-md"
                    alt={product.productId.name}
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{product.productId.name}</p>
                    <p className="text-gray-600">₹ {product.productId.price}</p>
                    <p className="text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
  )
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { showOrders, removeOrder } from "../features/orderSlice";

// const Order = () => {
//   const dispatch = useDispatch();
//   const { orders, loading, error } = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(showOrders());
//   }, [dispatch]);

//   const handleRemoveOrder = (orderId) => {
//     dispatch(removeOrder(orderId));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-4">
//         <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 text-center py-4">Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold text-center mb-4">Order List</h1>
//       {orders.length === 0 ? (
//         <p className="text-center text-lg">No orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id} className="mb-4 border p-4 rounded-md shadow-md">
//             <p className="text-lg font-semibold mb-2">Order ID: {order._id}</p>
//             <p className="text-md mb-2">Full name: {order.name}</p>
//             <p className="text-md mb-2">Order Status: {order.status}</p>
//             <p className="text-md mb-2">Payment Status: {order.razorpayPaymentStatus}</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//               {order.items &&
//                 order.items.map(
//                   (product) =>
//                     product.productId && (
//                       <div key={product.productId._id} className="flex items-center border-b py-2">
//                         <img
//                           src={product.productId.url}
//                           className="w-24 h-24 object-cover rounded-md"
//                           alt={product.productId.name}
//                         />
//                         <div className="ml-4">
//                           <p className="font-semibold">{product.productId.name}</p>
//                           <p className="text-gray-600">₹ {product.productId.price}</p>
//                           <p className="text-gray-500">Quantity: {product.quantity}</p>
//                         </div>
//                       </div>
//                     )
//                 )}
//             </div>
//             <button
//               onClick={() => handleRemoveOrder(order._id)}
//               className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//             >
//               Remove Order
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Order;

