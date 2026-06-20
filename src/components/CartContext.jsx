import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, cantidad) => {
    setCart((prev) => {
      
      // Verificamos si el producto ya está en el carrito usando _id de MongoDB

      const existe = prev.find((p) => p._id === product._id);

      if (existe) {
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      }
      return [...prev, { ...product, cantidad }];
    });
  };

  const increase = async (id) => {
    // Buscamos el producto en el carrito usando _id de MongoDB

    const producto = cart.find((p) => p._id === id);
    if (!producto) return;

    try {
      const res = await fetch(`http://localhost:3000/productos/${id}`);
      const data = await res.json();
      if (data.stock <= 0) return;

      await fetch(`http://localhost:3000/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, stock: data.stock - 1 }),
      });

      setCart((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
      window.dispatchEvent(new Event("stockUpdated"));
    } catch (error) { console.log(error); }
  };

  const decrease = async (id) => {
    const producto = cart.find((p) => p._id === id);
    if (!producto) return;

    try {
      const res = await fetch(`http://localhost:3000/productos/${id}`);
      const data = await res.json();

      await fetch(`http://localhost:3000/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, stock: data.stock + 1 }),
      });

      setCart((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        ).filter((p) => p.cantidad > 0)
      );
      window.dispatchEvent(new Event("stockUpdated"));
    } catch (error) { console.log(error); }
  };

  const removeFromCart = async (id) => {
    const producto = cart.find((p) => p._id === id);
    if (!producto) return;

    try {
      const res = await fetch(`http://localhost:3000/productos/${id}`);
      const data = await res.json();

      await fetch(`http://localhost:3000/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, stock: data.stock + producto.cantidad }),
      });

      // Usamos _id para filtrar el carrito

      setCart((prev) => prev.filter((p) => p._id !== id));
      window.dispatchEvent(new Event("stockUpdated"));

    const result = await Swal.fire({
    title: "¿Eliminar producto?",
    text: "Se quitará del carrito de compras.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
   });

if (!result.isConfirmed) return;
    
    } catch (error) { console.log(error); }
  };



  const clearCart = async () => {
    try {
      for (const item of cart) {
        const res = await fetch(`http://localhost:3000/productos/${item._id}`);
        const data = await res.json();
        await fetch(`http://localhost:3000/productos/${item._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, stock: data.stock + item.cantidad }),
        });
      }
      setCart([]);
      window.dispatchEvent(new Event("stockUpdated"));
    } catch (error) { console.log(error); }
  };

  const cartCount = cart.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, decrease, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}