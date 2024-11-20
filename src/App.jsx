import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css'
import './index.css';
import ProductList from './Pages/ProductList';
import Home from './Components/User/Home';
import Cart from './Components/User/Cart';
import Order from './Components/User/Order';
import OrderList from './Components/User/OrderList';
import UserContextProvider from './Context/UserContext';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import ProductDetails from './Components/User/ProductDetails';
import WishlistProvider from './Context/WishlistContext';
import WishlistPage from './Components/User/WishlistPage';
// import CouponDetails from './Components/User/CouponDetails';
import AdminProductPage from './Components/Admin/AdminProductPage';
import AdminContextProvider from './Components/Admin/AdminContext';
import Dashboard from './Components/Admin/Dashboard';



function App() {
  return (
    <div className="App">

      {/* Example custom styles in ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      {/* <Navbar/> */}
      <WishlistProvider>
        <UserContextProvider>
          <AdminContextProvider>
          <Routes>
            {/* <Route path="/Login" element={<Login />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orderList" element={<OrderList />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            {/* <Route path="/coupon" element={<CouponDetails />} /> */}


             {/* Admin-specific routes */}
             <Route path="/AdminProducts" element={<AdminProductPage />} />
             <Route path="/dashboard" element={<Dashboard />} />







          </Routes>
          </AdminContextProvider>
          
        </UserContextProvider>
        {/* <Footer /> */}
        {/* Move Footer outside of Routes so it appears on all pages */}
      </WishlistProvider>

    </div>
  );
}

export default App;


