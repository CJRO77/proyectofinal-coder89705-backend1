
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { CartProvider } from './components/CartContext.jsx';



createRoot(document.getElementById('root')).render(
  
  // Envolvemos toda la aplicación con CartProvider para que el contexto esté disponible en todos los componentes

  
    <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
    </BrowserRouter>
  
)


