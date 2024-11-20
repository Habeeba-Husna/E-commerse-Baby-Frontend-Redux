import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaBars } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { useRef } from 'react';
import { FaShopify } from "react-icons/fa";


const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);//to track whether the mobile menu is open or not.
  const mobileMenuRef = useRef(null);// reference for the mobile menu to manage interactions

  const handleCart = () => {
    if (!localStorage.getItem("id")) {
      toast.error("You must be logged in");
    } else {
      navigate('/cart');
    }
  };

  const handleOrderList = () => {
    if (!localStorage.getItem('id')) {
      toast.error("You must be logged in");
    } else {
      navigate('/orderlist');
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
    
    <nav
      className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-2xl sm:text-3xl text-white flex items-center">
            <FaShopify className="text-white mr-2" />
            Ellor@S
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-4 text-xl font-bold text-white flex-grow justify-center">
          <Link to="/">Home</Link>
          <Link to="/productList">Shop</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={handleCart} className="relative text-white flex items-center">
              <FaShoppingCart className="text-xl" />
              <span className="hidden group-hover:inline">Cart</span>
            </button>
            <Link to="/wishlist" className="text-white">
              <FaHeart className="text-xl" />
            </Link>
            <div className="relative group">
              <div className='flex gap-2'>
                <CgProfile className="text-3xl text-white cursor-pointer" />
                <span className='text-white'>{localStorage.getItem("name")}</span>
              </div>

              <div className="hidden group-hover:block absolute right-0 bg-white rounded shadow-lg p-2">
                {!localStorage.getItem('id') && (
                  <Link to='/Login' className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Login
                  </Link>
                )}
                <button onClick={handleOrderList} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Orders
                </button>
                {localStorage.getItem('id') && (
                  <button onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden bg-gray-700 p-4 space-y-4">
          <Link to="/" className="block text-white text-center">Home</Link>
          <Link to="/productList" className="block text-white text-center">Shop</Link>
          <button onClick={handleCart} className="block text-white text-center">
            Cart
          </button>
          <button className="block text-white text-center">
            WishList
          </button>

          {!localStorage.getItem('id') && (
            <Link to='/Login' className="block text-white text-center">
              Login
            </Link>
          )}
          <button onClick={handleOrderList} className="block text-white text-center">
            Orders
          </button>
          {localStorage.getItem('id') && (
            <button onClick={handleLogout} className="block text-white text-center">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
