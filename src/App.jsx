import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';

import './App.css'
import './index.css';
import ProductList from './Pages/ProductList';
import OrderHistory from './Pages/OrderHistory';

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="App">
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/order-History" element={<OrderHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


