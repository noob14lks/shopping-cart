import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import { Women } from "./pages/Women";
import { Men } from "./pages/Men";
import { Cart } from "./pages/CartContext";

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children : [
      {
        path:"",
        element :<Home />
      },
      { 
        path: "women",
        element: <Women />
      }, 
      { 
        path: "men", 
        element: <Men /> 
      },
      { 
        path: "cart", 
        element: <Cart /> 
      },
    ]
  }
]);

export default router;