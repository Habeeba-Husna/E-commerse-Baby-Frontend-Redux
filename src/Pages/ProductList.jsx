import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../Components/Navbar/Navbar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true); // Loading state
  const [errorProduct, setErrorProduct] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
        setLoadingProduct(false);
      } catch (error) {
        setErrorProduct("Failed to load products. Please try again later.");
        setLoadingProduct(false);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (loadingProduct) return <p className="text-center text-lg text-gray-600">Loading products...</p>;
  if (errorProduct) return <p className="text-center text-red-500">{error}</p>;

  return (



<div>
  {/* <Navbar/> */}



    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img 
              src={product.url} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
             
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-1">Price: ${Number(product.price).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductList;
