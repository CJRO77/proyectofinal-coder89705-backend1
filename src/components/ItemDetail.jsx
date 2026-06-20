import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import Swal from "sweetalert2"; 

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [producto, setProducto] = useState(null);

  const handleAdd = async () => {
    if (producto.stock === 0) return;

    const nuevoStock = producto.stock - 1;

    try {

      // Usamos producto._id para que MongoDB lo reconozca
      
      await fetch(`http://localhost:3000/productos/${producto._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stock: nuevoStock
        })
      });

      // actualizar frontend

      setProducto(prev => ({
        ...prev,
        stock: nuevoStock
      }));

      // agregar carrito

      addToCart(producto, 1);

      Swal.fire({
        title: "Producto agregado",
        text: `${producto.title} fue agregado al carrito`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    // uso el id para buscar el producto en la base de datos

    fetch(`http://localhost:3000/productos/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Producto no encontrado");
        }
        return res.json();
      })
      .then(data => {
        console.log("DATA:", data);
        setProducto(data);
      })
      .catch(err => {
        console.log("ERROR:", err);
        setProducto(false); 
      });
  }, [id]);

  if (producto === null) {
    return <h3>Cargando producto...</h3>;
  }

  if (producto === false) {
    return <h3>❌ Producto no encontrado</h3>;
  }

  return (
    <div className="container mt-4 text-center">
      <h2>{producto.title}</h2>

      <img
        src={`http://localhost:5173${producto.image}`}
        alt={producto.title}
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      <p>{producto.description}</p>
      <h4>${producto.price?.toLocaleString()}</h4>

      <p style={{
        fontWeight: "bold",
        color: producto.stock === 0 ? "red" : "black"
      }}>
        {producto.stock > 0
          ? `Stock disponible: ${producto.stock}`
          : "❌ Producto agotado"}
      </p>

      <div className="d-flex flex-column align-items-center gap-2 mt-3">
        <button
          className="btn btn-primary w-50"
          onClick={handleAdd}
          disabled={producto.stock === 0}
        >
          {producto.stock === 0 ? "Sin stock" : "Comprar"}
        </button>

        <button
          className="btn btn-outline-secondary w-50"
          style={{ maxWidth: "250px" }}
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;