
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import { CiSearch } from "react-icons/ci";
import Footer from '../Components/User/Footer';
import Navbar from '../Components/Navbar/Navbar';
// import Navbar from '../Components/Navbar/Navbar';

const ProductList = () => {
  const {addToCart}=useContext(UserContext)
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true); // Loading state
  const [errorProduct, setErrorProduct] = useState(null); // Error state
  const navigate = useNavigate();
  const [search , setSearch]  = useState('');
const [filtered , setFiltered] = useState([]);

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

  // if (loadingProduct) return <p className="text-center text-lg text-gray-600">Loading products...</p>;
  // if (errorProduct) return <p className="text-center text-red-500">{errorProduct}</p>;

  // const searchBarhandle = (e) => {
  //   setSearch(e.target.value)
  // }
  useEffect(() => {
    const filterProducts = () => {
        let filtered = products;
  
  
        if (search) {
            filtered = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search.toLowerCase() )|| product.category.toLowerCase().includes(search.toLowerCase())
            );
        }
  
        setFiltered(filtered);
    };
  
    filterProducts();
  }, [ search, products]);

  if (loadingProduct) return <p className="text-center text-lg text-gray-600">Loading products...</p>;
  if (errorProduct) return <p className="text-center text-red-500">{errorProduct}</p>;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
     <Navbar/>
    <div className='p-4'>
      
    <div className="flex items-center justify-center bg-white border border-gray-300 rounded-md p-2 w-60 h-10 mx-auto">
  <CiSearch className="text-gray-500 text-xl mr-2" />
  <input type="text" placeholder="Search..." className="w-full outline-none text-gray-700"  onChange={handleSearch}/>


</div>
    
    <div className="min-h-screen bg-gray-50">
      <ToastContainer/>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* {products.map((product) => ( */}
          {filtered.map((product) => (
            <div 
              key={product.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              // onClick={() => navigate(`/product/${product.id}`)}
            >
              <img 
                src={product.url} 
                alt={product.name} 
                className="w-full h-80 object-cover"
              />
               <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-1">Price: ${Number(product.price).toFixed(2)}</p>
                    <button

                        className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                  
                        onClick={() =>{
                            if(localStorage.getItem('id')){
                              addToCart(product)
                                // toast.success('Item added successfully')
                            }
                            else{
                                toast.success('Must be logged in')
                                navigate('/login')
                            }
                        }} 
                        // Calling AddToCart function
                    >
                       Add To Cart
                    </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ProductList;
