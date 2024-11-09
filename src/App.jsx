import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Pages/Login';
import Products from './Pages/Products';
import './App.css'
import './index.css';


function App() {
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/products" element={<Products />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;


