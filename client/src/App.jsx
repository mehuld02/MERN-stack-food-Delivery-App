import './App.css'
import Home from './screens/Home'
import Login from './screens/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from './screens/Signup.jsx';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import Cart from './screens/Cart.jsx';

function App() {
  return (
    <CartProvider>

    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/createuser" element={<Signup/>} />
          <Route exact path="/orderData" element={<Cart/>} />
          <Route exact path="/myOrder" element={<MyOrder/>} />

        </Routes>
      </div>
    </Router>
    </CartProvider>
  )
}

export default App
