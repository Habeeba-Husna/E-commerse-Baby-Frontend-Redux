// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { toast} from 'react-toastify';
// import { Link,useNavigate  } from 'react-router-dom';
// import {FaShoppingCart,FaUser,FaHeart,FaBars} from 'react-icons/fa';
// import { CgProfile } from "react-icons/cg";

// const Navbar = () => {
//   //   const name=localStorage.getItem("name")
//   const navigate = useNavigate();
//   //   const [menuOpen, setMenuOpen] = useState(false);
//   //   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   //   const userMenuRef = useRef(null);
//   //   const mobileMenuRef = useRef(null);
//   //   const { cart } = useContext(CartContext);
//   //   const toggleMenu = () => setMenuOpen(prev => !prev);
//   //   const toggleUserMenu = () => setUserMenuOpen(prev => !prev);

//   //   const handleClickOutside = (event) => {
//   //     if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//   //       setUserMenuOpen(false);
//   //     }
//   //     if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
//   //       setMenuOpen(false);
//   //     }
//   //   };

//   //   useEffect(() => {
//   //     document.addEventListener('mousedown', handleClickOutside);
//   //     return () => {
//   //       document.removeEventListener('mousedown', handleClickOutside);
//   //     };
//   //   }, []);

//   const handleCart = () => {
//     if (!localStorage.getItem("id")) {
//       toast.error("You must be logged in");
//     } else {
//       navigate('/cart');
//     }
//   };

//   //   const handleWishlist = () => {
//   //     if (!localStorage.getItem("id")) {
//   //       toast.error("You must be logged in");
//   //     } else {
//   //       navigate('/wishlist');
//   //     }
//   //   };

//   const handleOrderList = () => {
//     if (!localStorage.getItem('id')) {
//       toast.success('Must be logged in');
//     } else {
//       navigate('/orderlist');
//     }
//   };

//   const handleLogout = () => {
//     if (!localStorage.getItem("id")) {
//       toast.error("You must be logged in");
//     } else {
//       localStorage.removeItem('id');
//       toast.success('Logout successfully');
//       navigate('/login');
//     }
//   }

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <a className="font-bold text-2xl sm:text-3xl text-white" href="/">BABY SHOP</a>
//         </div>

//         {/* Center Links */}
//         <div className='flex flex-col md:flex-row items-center space-x-4 text-xl font-bold justify-center flex-grow text-white'>
//           <Link to='/'>Home</Link>
//           <Link to='/productList'>Shop</Link>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-4">

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center space-x-4">
//             <button onClick={handleCart} className="relative bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:from-secondary hover:to-primary" aria-label="Cart" >
//               <FaShoppingCart className="text-xl relative" />
//               <span className="hidden group-hover:inline">Cart</span>
//             </button>

//             <button
//               //   onClick={handleWishlist}
//               className="bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:from-secondary hover:to-primary"
//               aria-label="Favorites"
//             >
//               <FaHeart className="text-xl" />
//               <span className="hidden group-hover:inline">WishList</span>
//             </button>

//             <div className='group relative'>
//               <CgProfile className="text-3xl text-white cursor-pointer" />
//               <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
//                 <div className='flex flex-col gap-2 w-30 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
//                   {!localStorage.getItem('id') && (<Link to='/Login'>
//                     <button className='cursor-pointer hover:text-black'>Login</button></Link>)}
//                   <button onClick={handleOrderList} className='cursor-pointer hover:text-black'>
//                     Orders
//                   </button>
//                   {localStorage.getItem('id') && (
//                     <button onClick={handleLogout} className='cursor-pointer hover:text-black'>
//                       Logout
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <button
//               //   onClick={toggleMenu} 
//               className="mobile-menu-button text-white focus:outline-none"
//               aria-label="Toggle menu"
//             //   aria-expanded={menuOpen}
//             >
//               <FaBars className="text-2xl" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




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
      localStorage.removeItem('id');
      toast.success('Logout successfully');
      navigate('/login');
    }
  };

//   const handleWishlist = (product) => {
//     if (!localStorage.getItem("id")) {
//         toast.error("You must be logged in");
//     } else {
//         if (wishlist.some(item => item.id === product.id)) {
//             removeFromWishlist(product.id);
//             toast.info("Removed from wishlist");
//         } else {
//             addToWishlist(product);
//             toast.success("Added to wishlist");
//         }
//     }
// };


  return (
    <nav className="bg-gray-800 p-4">
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

            <button className="text-white">
              <FaHeart className="text-xl" />
            </button>


            {/* <button onClick={() => handleWishlist(product)} className="wishlist-button">
            <FaHeart className="text-xl" />
            {wishlist.some(item => item.id === product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
        </button> */}


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
