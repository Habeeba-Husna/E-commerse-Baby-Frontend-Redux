import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
      //   setErrorProducts(error.message || 'Failed to fetch products.');
      // } finally {
      //     setLoadingProducts(false);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

 

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          {/* Render product details */}
        </div>
      ))}
    </div>
  );
};

export default Products;
