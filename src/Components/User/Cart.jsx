import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios"
import { decrementQuantity, fetchUserCart, incrementQuantity, removeFromCart } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const userId=localStorage.getItem('id')
  const dispatch=useDispatch()
  // useEffect(()=>{
  //   dispatch(fetchUserCart(userId))
  // },[dispatch])

  useEffect(() => {
    if (userId) dispatch(fetchUserCart(userId));
  }, [dispatch, userId]);
  
  const navigate = useNavigate();
  // const { user, cart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);
  // Check if user exists and contains an id

const {cart}=useSelector((state)=>state.user)
  // Calculate total price whenever the cart changes
  useEffect(() => {
    const updatedTotal = cart.reduce((total, product) => {
      const quantity = product.quantity || 1;

      // Use finalPrice if available, otherwise fallback to original product price
      // const price = product.finalPrice || product.price;

      const price = parseFloat(product.finalPrice || product.price || 0);

      return total + price * quantity;
    }, 0);
    setTotalPrice(updatedTotal);
  }, [cart]);

  
  return (
    <div className="pt-[4rem]">
      <Navbar />
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-center mb-6 pt-5">YOUR CART</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-lg text-center mb-4">Your cart is currently empty.</h1>
            <button
              onClick={() => navigate("/productList")}
              className="bg-blue-500 text-white px-6 py-2 rounded-xl"
            >
              Shop now
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {cart.map((product) => (
                // const price = parseFloat(product.price || 0); // Ensure price is a valid number
                <div key={product.id} className="border rounded-lg shadow-lg p-4">
                  <img
                    src={product.url}
                    alt={product.name}
                    className="w-full h-60 rounded-t object-cover mb-4"
                  />
                  <h1 className="text-lg font-semibold text-center">{product.name}</h1>
                  <p className="text-center text-gray-700">₹ {product.price}</p>
                  {/* <p className="text-center text-gray-700">Price: ₹ {price.toFixed(2)}</p> */}

                  <div className="flex items-center justify-center mt-2">
                    <div className="flex items-center justify-between w-1/3 bg-gray-100 p-2 rounded">
                      <button
                        onClick={() => dispatch(decrementQuantity({ userId, cartItemId:product.id }))}
                        className="bg-gray-200 rounded px-2 flex items-center justify-center text-xl font-bold hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span>{product.quantity || 1}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity({ userId, cartItemId:product.id }))}
                        className="bg-gray-200 rounded px-2 flex items-center justify-center text-xl font-bold hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="bg-black text-white px-6 py-2 rounded-2xl w-full mt-4 hover:bg-red-600 text-sm"
                    onClick={() =>dispatch(removeFromCart({ userId, cartItemId:product.id })) }
                  >
                    REMOVE
                  </button>
                </div>
              ))}
            </div>

            {/* Total Price Section */}
            <div className="flex flex-col items-center sm:items-end">
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md">
                <span className="text-lg font-bold">Total Price:</span>
                <span className="text-lg font-semibold text-green-600">₹ {totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  console.log("Navigating to order page...");
                  navigate("/order");
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-900 hover:text-white text-sm"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Cart;


