import React, { useState, useEffect, useRef, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaBars
} from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { FiSettings } from 'react-icons/fi';
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { CiLogin, CiLogout } from "react-icons/ci";
// import { UserContext } from '../contexts/ContextCard';

const Navbar = () => {
  //   const name=localStorage.getItem("name")
  const navigate = useNavigate();
  //   const [menuOpen, setMenuOpen] = useState(false);
  //   const [userMenuOpen, setUserMenuOpen] = useState(false);
  //   const userMenuRef = useRef(null);
  //   const mobileMenuRef = useRef(null);
  //   const { cart } = useContext(CartContext);
  //   const toggleMenu = () => setMenuOpen(prev => !prev);
  //   const toggleUserMenu = () => setUserMenuOpen(prev => !prev);

  //   const handleClickOutside = (event) => {
  //     if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
  //       setUserMenuOpen(false);
  //     }
  //     if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
  //       setMenuOpen(false);
  //     }
  //   };

  //   useEffect(() => {
  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutside);
  //     };
  //   }, []);

  const handleCart = () => {
    if (!localStorage.getItem("id")) {
      toast.error("You must be logged in");
    } else {
      navigate('/cart');
    }
  };

  //   const handleWishlist = () => {
  //     if (!localStorage.getItem("id")) {
  //       toast.error("You must be logged in");
  //     } else {
  //       navigate('/wishlist');
  //     }
  //   };


  //   setUserMenuOpen(false);
  // };

  const handleOrderList = () => {
    if (!localStorage.getItem('id')) {
      toast.success('Must be logged in');
    } else {
      navigate('/orderlist');
    }
  };

  const handleLogout = () => {
    if (!localStorage.getItem("id")) {
      toast.error("You must be logged in");
    } else {
      localStorage.removeItem('id');
      toast.success('Logout successfully');
      navigate('/login');
    }
  }



  //     setUserMenuOpen(false);
  //   };




  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">

        <div className="flex items-center space-x-4">
          <a className="font-bold text-2xl sm:text-3xl text-white" href="/">BABY SHOP</a>
        </div>
        <div className='flex flex-col md:flex-row items-center space-x-4 text-xl font-bold justify-center flex-grow text-white'>
          <Link to='/'>Home</Link>
          <Link to='/productList'>Shop</Link>
        </div>



        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={handleCart}
              className="relative bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:from-secondary hover:to-primary"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-xl relative" />


              {/* {cart.length>0? ( <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length} 
              </span>):("")} */}

              <span className="hidden group-hover:inline">Cart</span>
            </button>
            <button
              //   onClick={handleWishlist}
              className="bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:from-secondary hover:to-primary"
              aria-label="Favorites"
            >
              <FaHeart className="text-xl" />
              <span className="hidden group-hover:inline">WishList</span>
            </button>
            <div className='group relative'>
              <CgProfile className="text-3xl text-white cursor-pointer" />
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-30 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                  {!localStorage.getItem('id') && (<Link to='/Login'>
                    <button className='cursor-pointer hover:text-black'>Login</button></Link>)}
                  <button
                    onClick={handleOrderList}
                    className='cursor-pointer hover:text-black'>Orders</button>
                  {localStorage.getItem('id') && (
                    <button
                      onClick={handleLogout}
                      className='cursor-pointer hover:text-black'>Logout</button>)}
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              //   onClick={toggleMenu} 
              className="mobile-menu-button text-white focus:outline-none"
              aria-label="Toggle menu"
            //   aria-expanded={menuOpen}
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;