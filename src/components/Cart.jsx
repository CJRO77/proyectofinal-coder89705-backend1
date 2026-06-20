import { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, increase, decrease, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (acc, p) => acc + p.price * p.cantidad,
    0
  );

  return (
    <div className="cart-container-page">
      <h2>Resumen de compra</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        cart.map(p => (

          // Usamos p._id como clave y para las funciones de aumento, disminución y eliminación

          <div key={p._id} style={{ 
            background: "#14b6d3",
            color: "#000",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px"
          }}>
            <h4>{p.title}</h4>

  

            <button onClick={() => decrease(p._id)}>-</button>

            <span style={{ margin: "0 10px" }}>
              {p.cantidad}
            </span>

            <button onClick={() => increase(p._id)}>+</button>

            <button 
              className="btn-delete"
              onClick={() => removeFromCart(p._id)}
              title="Eliminar producto"
            >
              <FaTrash />
            </button>
          </div>
        ))
      )}

      <h3>Total: ${total.toLocaleString()}</h3>
      
      <Link to="/checkout">
        <button className="btn btn-success">
          Finalizar compra
        </button>
      </Link>
    </div>
  );
}

export default Cart;