import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Mainlayout';
import { LoginLayout } from './Components/LoginLayout';
import ProductList from './Pages/ProductList';
import Home from './User/Home';
import Cart from './User/Cart';
import Order from './User/Order';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import ProductDetails from './User/ProductDetails';
import WishlistPage from './User/WishlistPage';
// import OrderList from './User/OrderList';
import NotFoundPage from './Components/NotFoundPage';
import PaymentDetail from './User/PaymentDetail';
import AdminHome from './Components/Admin/Dashboard';
import Adminlayout from './Components/Admin/AdminLayout';
import AdminProduct from './Components/Admin/AdminProductPage';
import AdminUser from './Components/Admin/AdminUser';
// import AdminProtected from './Components/Admin/AdminProtected';

function App() {


  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Routes>
    <Route element={<LoginLayout />} >
    <Route path='/' element={<Home />} />
    <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/payment' element={<PaymentDetail />} />
      <Route path="*" element={<NotFoundPage />} />

      </Route>
      <Route element={<Layout />} >
      
      <Route path="/productList" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/order" element={<Order />} />
      {/* <Route path="/orderList" element={<OrderList/>} />  */}
      
      </Route>
      {/* <Route  element={<AdminProtected><AdminNavbar/></AdminProtected>} ></Route> */}
    <Route element={<Adminlayout />}>
    <Route path='/admin' element={<AdminHome/>} />
      <Route path='/adminproduct' element={<AdminProduct />} />
      <Route path='/adminuser' element={<AdminUser />} />
      </Route>
    </Routes>
    
    </div>
  )


}

export default App;


