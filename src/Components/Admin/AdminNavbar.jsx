import React from "react";
import { FaShopify } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate, Link, Outlet } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white fixed top-0 left-0 h-screen md:w-64 lg:w-72 flex flex-col justify-between">
        {/* Brand Section */}
        <div className="flex flex-col items-center py-6">
          <Link
            to="/"
            className="flex items-center text-2xl sm:text-3xl font-bold text-white mb-10"
          >
            <FaShopify className="text-teal-400 mr-2" />
            Ellor@S
          </Link>

          {/* Navigation Buttons */}
          <div className="w-full px-4 space-y-4 mt-12">
            <button
              onClick={() => navigate("/admin")}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-teal-500 rounded-md text-lg flex items-center justify-center transition-colors"
            >
              Products
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-teal-500 rounded-md text-lg flex items-center justify-center transition-colors"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/user")}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-teal-500 rounded-md text-lg flex items-center justify-center transition-colors"
            >
              UserPage
            </button>

            <button
              onClick={() => navigate("/rating")}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-teal-500 rounded-md text-lg flex items-center justify-center transition-colors"
            >
              RatingPage
            </button>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 rounded-md flex items-center justify-center text-lg transition-colors"
            >
              <IoLogOutOutline size={24} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Section with Outlet */}
      <div className="ml-64 lg:ml-72 flex-grow bg-gray-50 p-6">
        <Outlet /> {/* The Outlet where nested route content will be rendered */}
      </div>
    </div>
  );
};

export default AdminNavbar;




