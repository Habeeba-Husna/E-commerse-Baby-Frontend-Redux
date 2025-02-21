import React, { useState } from "react";
import { Modal, Button } from "../Components/Modal";
import { Heart } from "lucide-react";

const ProductDetails = ({ product, onClose, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  return (
    <Modal onClose={onClose} isOpen>
      <div className="p-4 flex flex-col items-center relative">

        {/* Product Image with Out of Stock Overlay */}
        <div className="relative w-90 h-64"> {/* Increased width from 64 to 80 */}
          <img
            src={product.url}
            alt={product.name}
            className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105" // Bulging effect on hover
          />
          {product.quantity === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <span className="text-white text-lg font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Name & Description */}
        <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-gray-600 mt-2">Quantity:{product.quantity}</p>

        {/* Price Display */}
        <p className="text-lg font-bold text-green-600 mt-2">₹{product.price}</p>

        <div className="flex items-center justify-between w-full mt-4">
          {/* Wishlist Button */}
          <button className="text-red-500 text-2xl" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart fill={isWishlisted ? "red" : "none"} />
          </button>

          {/* Add to Cart Button (Disabled if out of stock) */}
          <Button
            onClick={() => onAddToCart(product._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            disabled={product.quantity === 0}
          >
            {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetails;



