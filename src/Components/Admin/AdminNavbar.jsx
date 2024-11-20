import React from 'react'
import { FaShopify } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate,Link } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate()

  return (
    <div className='flex'>
    <div className='bg-gray-900 md:w-64 lg:w-72 min-h-screen text-white flex flex-col items-center py-6'>
      <div className='flex items-center space-x-3 mb-28'>
      <Link to="/" className="font-bold text-2xl sm:text-3xl text-white flex items-center">
            <FaShopify className="text-white mr-2" />
            Ellor@S
          </Link>
        </div>

      <div className='space-y-4 w-full text-center'>
        <button onClick={() => navigate('/admin')} className='w-full py-2 bg-gray-600 hover:bg-gray-500 rounded-md'>Products</button>
      
        {/* <button onClick={() => navigate('/dashboard')} className='w-full py-2 bg-gray-600 hover:bg-gray-500 rounded-md'>Dashboard</button>
     
        <button onClick={() => navigate('/userpage')} className='w-full py-2 bg-gray-600 hover:bg-gray-500 rounded-md'>UserPage</button>
      
        <button onClick={() => navigate('/login')} className="w-full py-2  rounded-md flex items-center justify-center"><IoLogOutOutline size={24} className='mr-2' /></button> */}
      
      </div> 
    </div>
    
      <div>
      
      </div>
      
    </div>
  )
}

export default AdminNavbar