import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CartContext } from "./pages/CartContext";

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});

  const addToCart = (item, quantity) => {
    const exists = cart.find(cartItem => cartItem.id === item.id);
    if(!exists){
      setCart(prev => [...prev, item]);
      setCartQuantities(prev => ({...prev,[item.id]: quantity}));
    }
    else{
      setCartQuantities(prev => ({...prev, [item.id] : prev[item.id] + quantity}));
    }
    
  }

  return (
    <CartContext.Provider value = {{cart, addToCart, cartQuantities, setCartQuantities, setCart}}>
      <nav>
        <ul>
          <li>
            <Link to = "/" className="nav-link">HOME</Link>
          </li>
          <li>
            <Link to = "/women" className="nav-link">WOMEN</Link>
          </li>
          <li>
            <Link to = "/men" className="nav-link">MEN</Link>
          </li>
        </ul>
        <ul>
          <li className="cart">
            <Link to = "/cart" className="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" id="cart" viewBox="0 0 48 48">
              <path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96a2 2 0 0 0-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            {cart.length > 0 && 
            <span className="count">{cart.length}</span>
          }
          </Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
  </CartContext.Provider>
  );
};

export default App;
