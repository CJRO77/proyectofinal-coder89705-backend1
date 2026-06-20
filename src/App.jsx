import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacto from "./components/Contacto";
import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartProvider } from "./components/CartContext";

function App() {

  return (
              // Envolvemos toda la aplicación con el CartProvider para que el contexto esté disponible en todos los componentes
    
   <CartProvider>

    

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<ItemListContainer />}
          />

          <Route
            path="/productos/:categoria"
            element={<ItemListContainer />}
          />

          <Route
            path="/producto/:id"
            element={<ItemDetail />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/contacto"
            element={<Contacto />}
          />

        </Routes>

      

    </CartProvider>
  );
}

export default App;