import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Baby Store</h2>
          <p className="text-gray-500">
            The shop for all needs. We provide new and fashionable clothes for your little ones.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2"><a href="/home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
            <li className="mb-2"><a href="/shop" className="text-gray-600 hover:text-blue-600 transition-colors">Shop</a></li>
            <li className="mb-2"><a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
            <li className="mb-2"><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-600 mb-2">Address: No: 58 A, East Madison Street, Baltimore, MD, USA 4508</p>
          <p className="text-gray-600 mb-2">Email: habeebahusna@gmail.com</p>
          <p className="text-gray-600">Phone: +91 9000023415</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">My Account</h3>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Orders & Returns</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-300 text-center">
        <p className="text-gray-600">&copy; 2024 eCommerce Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
