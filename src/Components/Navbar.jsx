import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/productSlice";
import { logoutUser, fetchUserDetails } from "../features/authSlice";
import { getCart } from "../features/cartSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllProducts({ search }));
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(getCart());
  }, [dispatch]);

  const handleCart = () => {
    if (user) {
      navigate("/cart");
    } else {
      toast.error("Please log in to access the cart");
    }
  };

  const handleWishlist = () => {
    if (user) {
      navigate("/wishlist");
    } else {
      toast.error("Please log in to access the wishlist");
    }
  };

  const handleOrderList = () => {
    if (user) {
      navigate("/order");
    } else {
      toast.error("Please log in to view your orders");
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
      window.location.reload();
      toast.success("Logout successfully");
    } catch (error) {
      toast.error("Error during logout");
    }
  };

  return (
    <nav className="w-full sticky top-0 z-10 bg-gray-200 shadow-md">
      <div className="flex items-center justify-between py-4 max-w-screen-xl mx-auto px-4">
        {/* Logo */}
        <Link to="/" className="text-xl lg:text-3xl font-bold">Ellor@S</Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 text-gray-700">
          <Link to="/" className="hover:text-blue-500">HOME</Link>
          <Link to="/productList" className="hover:text-blue-500">SHOP</Link>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-[200px] transition-all duration-300 border px-2 py-1 rounded-full focus:outline-none focus:border-blue-500"
            />
            <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" />
          </div>

          {/* Icons */}
          <button onClick={handleCart} className="relative">
            <IoMdCart className="text-2xl text-gray-700 hover:text-blue-500" />
            {cart?.length > 0 && (
              <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          <button onClick={handleWishlist}>
            <MdOutlineFavoriteBorder className="text-2xl text-gray-700 hover:text-blue-500" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <CgProfile className="text-3xl cursor-pointer text-gray-700" />
            <div className="hidden group-hover:block absolute right-0 mt-2 bg-white rounded shadow-lg py-2">
              {!user ? (
                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                  Login
                </Link>
              ) : (
                <>
                  <button onClick={handleOrderList} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left">
                    Orders
                  </button>
                  <button onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-gray-700">
            {menuOpen ? <IoIosClose className="text-3xl" /> : <IoIosMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-100 text-center py-4 space-y-4">
          <Link to="/" className="block w-full text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/productList" className="block w-full text-gray-700 hover:text-blue-500">Shop</Link>
          <button onClick={handleCart} className="block w-full text-gray-700 hover:text-blue-500">Cart</button>
          <button onClick={handleWishlist} className="block w-full text-gray-700 hover:text-blue-500">Wishlist</button>
          {!user ? (
            <Link to="/login" className="block w-full text-gray-700 hover:text-blue-500">Login</Link>
          ) : (
            <>
              <button onClick={handleOrderList} className="block w-full text-gray-700 hover:text-blue-500">Orders</button>
              <button onClick={handleLogout} className="block w-full text-gray-700 hover:text-blue-500">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

















