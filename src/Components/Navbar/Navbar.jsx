import React, { useState,useContext  } from 'react';
import { toast } from 'react-toastify';
// import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaBars } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { useRef } from 'react';
import { FaShopify } from "react-icons/fa";
import { UserContext } from '../../Context/UserContext';



const Navbar = () => {
  const navigate = useNavigate();
  const {cartItemCount}=useContext(UserContext)

  const [menuOpen, setMenuOpen] = useState(false);//to track whether the mobile menu is open or not.
  const mobileMenuRef = useRef(null);// reference for the mobile menu to manage interactions

  const handleCart = () => {
    if (!localStorage.getItem("id")) {
      toast.error("You must be logged in");
    } else {
      navigate('/cart');
    }
  };

  // const handleOrderList = () => {
  //   if (!localStorage.getItem('id')) {
  //     toast.error("You must be logged in");
  //   } else {
  //     navigate('/orderlist');
  //   }
  // };

  const handleOrderList = () => {
    const userId = localStorage.getItem('id');
    
    if (!userId) {
      toast.error("You must be logged in");
      return;
    } else {
      setTimeout(() => {
        navigate('/orderlist');
      }, 500); 
    }
  };

  const handleLogout = () => {
    if (!localStorage.getItem("id")) {
      toast.error("You must be logged in");
    } else {
      // Remove both id and name from localStorage
      localStorage.removeItem('id');
      localStorage.removeItem('name');

      toast.success('Logout successfully');
      navigate('/login');
    }
  };

    return (
    <nav className="bg-gray-800 p-5 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center text-white text-2xl font-bold">
          <FaShopify className="mr-2" />
          Ellor@S
        </Link>

{/* <Link to="/" className="flex items-center text-white text-2xl font-bold">
      <img
        src="https://mom-n-me-demo.myshopify.com/cdn/shop/t/5/assets/logo.png?v=53344545660479787701723882648"
        alt="Ellor@S Logo"
        className="mr-2 w-26 h-auto"
        
      />
    </Link> */}

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center text-white text-lg">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/productList" className="hover:text-blue-400">Shop</Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex space-x-6 items-center">
          <button onClick={handleCart} className="relative text-white hover:text-blue-400 ">
            <FaShoppingCart className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )} 
          </button>
          <Link to="/wishlist" className="text-white hover:text-blue-400">
            <FaHeart className="text-2xl" />
          </Link>
          <div className="relative group">
            <div className="flex items-center cursor-pointer">
              <CgProfile className="text-3xl text-white" />
              <span className="ml-2 text-sm text-white">{localStorage.getItem("name")}</span>
              {/* <span className="ml-2 text-sm text-white">{localStorage.getItem("name") || "Profile"}</span> */}
            </div>
            <div className="hidden group-hover:block absolute right-0 mt-2 bg-white rounded shadow-lg py-2">
              {!localStorage.getItem('id') && (
                <Link to='/Login' className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Login
                </Link>
              )}
              <button onClick={handleOrderList} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
                Orders
              </button>
              {localStorage.getItem('id') && (
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700 text-white text-center py-4 space-y-4">
          <Link to="/" className="block w-full hover:text-blue-400 text-center">Home</Link>
          <Link to="/productList" className="block w-full hover:text-blue-400 text-center">Shop</Link>
          <button onClick={handleCart} className="block w-full hover:text-blue-400 text-center">Cart</button>
          <Link to="/wishlist" className="block w-full hover:text-blue-400 text-center">Wishlist</Link>
          {!localStorage.getItem('id') && (
            <Link to='/Login' className="block w-full hover:text-blue-400 text-center">Login</Link>
          )}
          <button onClick={handleOrderList} className="block w-full hover:text-blue-400 text-center">Orders</button>
          {localStorage.getItem('id') && (
            <button onClick={handleLogout} className="block w-full hover:text-blue-400 text-center">Logout</button>
          )}
        </div>
      )}
     
    </nav>
    
  );
};

export default Navbar;



