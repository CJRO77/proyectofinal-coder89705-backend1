import './Card.css'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";

function Card({ product, setProductos }) {

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleAdd = async (e) => {
    e.stopPropagation();

    if (product.stock === 0) return;

    const nuevoStock = product.stock - 1;

    try {
      // Uso product._id para la base de datos

      await fetch(`http://localhost:3000/productos/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          stock: nuevoStock,
        }),
      });

      // Uso _id para actualizar el estado visual
      setProductos((prev) =>
        prev.map((p) =>
          p._id === product._id
            ? { ...p, stock: nuevoStock }
            : p
        )
      );

      addToCart(
        { ...product, stock: nuevoStock },
        1
      );


      //alerta visual

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${product.title} se añadió al carrito correctamente.`,
      timer: 2000,
      showConfirmButton: false,
      confirmButtonColor: "#3483fa"
    });


    } catch (error) {
      console.log(error);
    }
  };

  return (
    //contenedor de cada producto en la lista de productos

    <div className="card-item">
        
      <img src={`http://localhost:5173${product.image}`} 
        className="card-image"
        alt={product.title}
        onClick={() => navigate(`/producto/${product._id}`)}
        style={{ cursor: "pointer" }}
      />

      <h2 className="card-h2">{product.title}</h2>

      <p className="card-price">
        ${product.price?.toLocaleString()}
      </p>

      <p className="card-stock">
        Stock: {product.stock}
      </p>

      <div className="status-badge-container">
        <span className={`status-badge ${product.stock <= 0 ? "agotado" : "disponible"}`}>
          {product.stock <= 0 ? "AGOTADO" : "DISPONIBLE"}
        </span>
      </div>

      <button
        className="btn-ml"
        onClick={handleAdd}
        disabled={product.stock <= 0}
      >
        {product.stock <= 0 ? "Sin stock" : "Comprar"}
      </button>

    </div>
  );
}

export default Card;